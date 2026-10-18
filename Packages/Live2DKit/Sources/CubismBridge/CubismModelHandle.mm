//
//  CubismModelHandle.mm
//  Live2DKit
//

#import "include/CubismModelHandle.h"
#import "include/CubismBridge.h"
#import "CubismModelHandle+Internal.h"

#import <CubismFramework.hpp>
#import <Model/CubismMoc.hpp>
#import <Model/CubismModel.hpp>
#import <Physics/CubismPhysics.hpp>
#import <Effect/CubismPose.hpp>
#import <Id/CubismIdManager.hpp>
#import <Motion/ACubismMotion.hpp>
#import <Motion/CubismMotion.hpp>
#import <Motion/CubismMotionManager.hpp>

#import <map>
#import <cmath>
#import <limits>
#import <string>
#import <vector>

using namespace Csm;

namespace {

NSError *BridgeError(CubismBridgeError code, NSString *message) {
    return [NSError errorWithDomain:@"Live2DKit.CubismBridge"
                               code:code
                           userInfo:@{ NSLocalizedDescriptionKey: message }];
}

bool IsMotionNumber(id value) {
    return [value isKindOfClass:NSNumber.class]
        && CFGetTypeID((__bridge CFTypeRef)value) != CFBooleanGetTypeID()
        && std::isfinite([value doubleValue])
        && std::abs([value doubleValue]) <= std::numeric_limits<float>::max();
}

/// Some exported Sekai clips count points as segments. Recompute allocation
/// metadata from validated curves instead of disabling Cubism's consistency
/// check. This only changes the in-memory copy, never the imported files.
NSData *ValidatedMotionData(NSData *data) {
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    if (![json isKindOfClass:NSDictionary.class]) { return nil; }
    NSDictionary *meta = json[@"Meta"];
    NSArray *curves = json[@"Curves"];
    if (![meta isKindOfClass:NSDictionary.class] || ![curves isKindOfClass:NSArray.class]
        || curves.count == 0 || !IsMotionNumber(meta[@"Duration"])
        || [meta[@"Duration"] doubleValue] <= 0 || !IsMotionNumber(meta[@"Fps"])
        || [meta[@"Fps"] doubleValue] <= 0) { return nil; }

    NSUInteger segmentCount = 0, pointCount = 0;
    for (id curve in curves) {
        if (![curve isKindOfClass:NSDictionary.class]) { return nil; }
        if (![@[@"Model", @"Parameter", @"PartOpacity"] containsObject:curve[@"Target"]]
            || ![curve[@"Id"] isKindOfClass:NSString.class]
            || [curve[@"Id"] length] == 0) { return nil; }
        NSArray *segments = curve[@"Segments"];
        // Cubism requires an initial point followed by at least one full segment.
        if (![segments isKindOfClass:NSArray.class] || segments.count < 5) { return nil; }
        for (id value in segments) { if (!IsMotionNumber(value)) { return nil; } }
        double previousTime = [segments[0] doubleValue];
        ++pointCount;
        for (NSUInteger i = 2; i < segments.count;) {
            double type = [segments[i] doubleValue];
            if (type != 0 && type != 1 && type != 2 && type != 3) { return nil; }
            NSUInteger length = type == 1 ? 7 : 3;
            if (segments.count - i < length) { return nil; }
            double endTime = [segments[i + length - 2] doubleValue];
            if (endTime <= previousTime) { return nil; }
            previousTime = endTime;
            ++segmentCount;
            pointCount += type == 1 ? 3 : 1;
            i += length;
        }
    }
    NSArray *events = json[@"UserData"] ?: @[];
    if (![events isKindOfClass:NSArray.class]) { return nil; }
    NSUInteger eventBytes = 0;
    for (id event in events) {
        if (![event isKindOfClass:NSDictionary.class] || !IsMotionNumber(event[@"Time"])
            || ![event[@"Value"] isKindOfClass:NSString.class]) { return nil; }
        eventBytes += [event[@"Value"] lengthOfBytesUsingEncoding:NSUTF8StringEncoding];
    }
    const NSUInteger limit = std::numeric_limits<csmInt32>::max();
    if (curves.count > limit || segmentCount > limit || pointCount > limit
        || events.count > limit || eventBytes > limit) { return nil; }
    NSMutableDictionary *normalizedMeta = [meta mutableCopy];
    normalizedMeta[@"CurveCount"] = @(curves.count);
    normalizedMeta[@"TotalSegmentCount"] = @(segmentCount);
    normalizedMeta[@"TotalPointCount"] = @(pointCount);
    normalizedMeta[@"UserDataCount"] = @(events.count);
    normalizedMeta[@"TotalUserDataSize"] = @(eventBytes);
    NSMutableDictionary *normalized = [json mutableCopy];
    normalized[@"Meta"] = normalizedMeta;
    // Cubism's numeric parser requires a comma or newline after a number; a
    // compact JSON array ending in `number]` is rejected by SDK 5-r.5.
    NSData *serialized = [NSJSONSerialization dataWithJSONObject:normalized options:NSJSONWritingPrettyPrinted error:nil];
    if (serialized == nil) { return nil; }
    NSMutableString *text = [[[NSString alloc] initWithData:serialized encoding:NSUTF8StringEncoding] mutableCopy];
    // It also rejects scientific notation, which Foundation may emit even when
    // the original file used decimal notation. Pretty printing places numeric
    // values at line ends; quoted string values cannot match this pattern.
    NSRegularExpression *exponents = [NSRegularExpression
        regularExpressionWithPattern:@"-?[0-9]+(?:\\.[0-9]+)?[eE][+-]?[0-9]+(?=,?$)"
        options:NSRegularExpressionAnchorsMatchLines error:nil];
    NSArray<NSTextCheckingResult *> *matches = [exponents matchesInString:text options:0 range:NSMakeRange(0, text.length)];
    for (NSTextCheckingResult *match in matches.reverseObjectEnumerator) {
        NSString *number = [text substringWithRange:match.range];
        NSString *decimal;
        if (std::abs(number.doubleValue) < std::numeric_limits<float>::denorm_min()) {
            decimal = @"0";
        } else {
            NSDecimalNumber *value = [NSDecimalNumber decimalNumberWithString:number locale:@{NSLocaleDecimalSeparator: @"."}];
            if ([value isEqualToNumber:NSDecimalNumber.notANumber]) { return nil; }
            decimal = value.stringValue;
        }
        [text replaceCharactersInRange:match.range withString:decimal];
    }
    return [text dataUsingEncoding:NSUTF8StringEncoding];
}

/// Read the `LipSync` / `EyeBlink` group IDs out of a `.model3.json`.
///
/// Parsed with `NSJSONSerialization` rather than Cubism's own
/// `CubismModelSettingJson` on purpose: we need only two arrays of strings, and
/// going through the C++ parser would drag its csmString/csmVector containers
/// across the bridge for no benefit. The schema here is stable and public.
NSArray<NSString *> *GroupIDs(NSDictionary *settings, NSString *groupName) {
    NSArray *groups = settings[@"Groups"];
    if (![groups isKindOfClass:NSArray.class]) { return @[]; }

    for (id entry in groups) {
        if (![entry isKindOfClass:NSDictionary.class]) { continue; }
        if (![entry[@"Name"] isEqual:groupName]) { continue; }

        NSArray *ids = entry[@"Ids"];
        if (![ids isKindOfClass:NSArray.class]) { return @[]; }

        NSMutableArray<NSString *> *result = [NSMutableArray arrayWithCapacity:ids.count];
        for (id identifier in ids) {
            if ([identifier isKindOfClass:NSString.class]) { [result addObject:identifier]; }
        }
        return result;
    }
    return @[];
}

}  // namespace

@implementation CubismModelHandle {
    CubismMoc *_moc;
    CubismModel *_model;
    /// Optional physics simulation (hair, clothes) from the model's physics3.json.
    /// Null when the model ships none or it fails to parse; physics is flavour,
    /// never load-bearing, so its absence must not fail the load.
    CubismPhysics *_physics;
    /// Optional part-opacity controller from the model's pose3.json. NOT optional
    /// in effect for models that have one: pose picks WHICH variant of a swappable
    /// part group is visible (Hiyori: PartArmA vs PartArmB). Skip it and every
    /// variant renders at once: the four-armed girl.
    CubismPose *_pose;
    /// The aligned copy of the .moc3 bytes. Core revives the moc IN PLACE and keeps
    /// reading from this buffer, so it must outlive `_moc`, hence owned here rather
    /// than borrowed from the NSData.
    void *_mocBuffer;
    /// Parameter IDs this rig actually has, for the guards below.
    NSSet<NSString *> *_knownParameterIDs;
    /// Authored clips from `FileReferences.Motions`, keyed by group name, in the
    /// group's declared order (so "index 2 of Idle" means the same clip every run).
    /// Owned here; the queue manager only borrows them (`autoDelete: false`).
    std::map<std::string, std::vector<CubismMotion *>> _motions;
    /// The playback queue, created only when at least one clip loaded. Deleted
    /// BEFORE the clips in dealloc: its queue entries point into `_motions`.
    CubismMotionManager *_motionManager;
    NSArray<NSString *> *_motionGroupNames;
    /// The raw pose3.json bytes, kept so `-setPoseFadeDuration:` can rebuild the
    /// pose with an overridden FadeInTime; `CubismPose` has no fade setter.
    NSData *_poseJSON;
}

- (nullable instancetype)initWithContentsOfURL:(NSURL *)modelJSONURL error:(NSError **)error {
    self = [super init];
    if (self == nil) { return nil; }

    // Cubism is NOT thread-safe: the framework, its allocator and its id manager are
    // process-global mutable state, so two threads creating models concurrently
    // corrupt it and crash. (Every test here passed alone and the SUITE segfaulted:
    // Swift Testing runs tests in parallel.)
    //
    // Serializing the whole load protects real callers too, not just tests: nothing
    // in the API otherwise stops a second model being loaded while a first is in
    // flight.
    @synchronized (CubismRuntime.shared) {

    // The runtime's allocator must exist before any Cubism allocation. Starting it
    // here rather than demanding callers remember is the difference between a clear
    // API and a crash on first use.
    [CubismRuntime.shared start];

    NSData *settingsData = [NSData dataWithContentsOfURL:modelJSONURL];
    if (settingsData == nil) {
        if (error) { *error = BridgeError(CubismBridgeErrorModelUnreadable,
                                          [NSString stringWithFormat:@"can't read %@", modelJSONURL.path]); }
        return nil;
    }

    NSDictionary *settings = [NSJSONSerialization JSONObjectWithData:settingsData options:0 error:nil];
    if (![settings isKindOfClass:NSDictionary.class]) {
        if (error) { *error = BridgeError(CubismBridgeErrorModelInvalid, @"model3.json is not an object"); }
        return nil;
    }

    NSString *mocName = settings[@"FileReferences"][@"Moc"];
    if (![mocName isKindOfClass:NSString.class]) {
        if (error) { *error = BridgeError(CubismBridgeErrorModelInvalid, @"model3.json has no FileReferences.Moc"); }
        return nil;
    }

    NSURL *mocURL = [modelJSONURL.URLByDeletingLastPathComponent URLByAppendingPathComponent:mocName];
    NSData *mocData = [NSData dataWithContentsOfURL:mocURL];
    if (mocData == nil) {
        if (error) { *error = BridgeError(CubismBridgeErrorModelUnreadable,
                                          [NSString stringWithFormat:@"can't read %@", mocURL.path]); }
        return nil;
    }

    // The moc bytes MUST be 64-byte aligned (`csmAlignofMoc`), and the buffer must
    // outlive the moc: Core revives it IN PLACE and keeps reading from it.
    //
    // `NSData.bytes` guarantees neither, and handing it over directly segfaults
    // inside Core's aligned vector loads with no diagnostic. So the bytes are
    // copied into an owned, aligned buffer that lives as long as this handle.
    // `csmAlignofMoc` is a Core enum, so it needs its namespace, same as
    // `csmGetVersion` in CubismBridge.mm.
    void *mocBuffer = nullptr;
    const size_t mocAlignment = Live2D::Cubism::Core::csmAlignofMoc;
    if (posix_memalign(&mocBuffer, mocAlignment, mocData.length) != 0 || mocBuffer == nullptr) {
        if (error) { *error = BridgeError(CubismBridgeErrorModelUnreadable, @"can't allocate an aligned moc buffer"); }
        return nil;
    }
    memcpy(mocBuffer, mocData.bytes, mocData.length);

    // `shouldCheckMocConsistency: true`: a corrupt .moc3 otherwise faults deep
    // inside Core rather than returning null, and a user-supplied file is exactly
    // where corruption shows up.
    CubismMoc *moc = CubismMoc::Create(static_cast<const csmByte *>(mocBuffer),
                                       static_cast<csmSizeInt>(mocData.length),
                                       true);
    if (moc == nullptr) {
        free(mocBuffer);
        if (error) { *error = BridgeError(CubismBridgeErrorModelInvalid, @"moc3 failed its consistency check"); }
        return nil;
    }
    _mocBuffer = mocBuffer;

    CubismModel *model = moc->CreateModel();
    if (model == nullptr) {
        CubismMoc::Delete(moc);
        if (error) { *error = BridgeError(CubismBridgeErrorModelInvalid, @"moc3 produced no model"); }
        return nil;
    }

    _moc = moc;
    _model = model;
    _lipSyncParameterIDs = GroupIDs(settings, @"LipSync");
    _eyeBlinkParameterIDs = GroupIDs(settings, @"EyeBlink");

    NSMutableArray<NSString *> *ids = [NSMutableArray array];
    const csmInt32 count = model->GetParameterCount();
    for (csmInt32 index = 0; index < count; index++) {
        const csmChar *raw = model->GetParameterId(index)->GetString().GetRawString();
        [ids addObject:[NSString stringWithUTF8String:raw ?: ""]];
    }
    _parameterIDs = ids;
    _knownParameterIDs = [NSSet setWithArray:ids];

    // Physics (hair/clothes secondary motion), if the model ships it. Parsed, not
    // revived, so no alignment ceremony is needed. Failure is silent by design: a model
    // without working physics still renders and lipsyncs; it just holds stiller.
    NSString *physicsName = settings[@"FileReferences"][@"Physics"];
    if ([physicsName isKindOfClass:NSString.class]) {
        NSURL *physicsURL = [modelJSONURL.URLByDeletingLastPathComponent
                             URLByAppendingPathComponent:physicsName];
        NSData *physicsData = [NSData dataWithContentsOfURL:physicsURL];
        if (physicsData != nil) {
            _physics = CubismPhysics::Create(
                static_cast<const csmByte *>(physicsData.bytes),
                static_cast<csmSizeInt>(physicsData.length));
        }
    }

    // Pose (part-opacity switching for swappable part groups). Unlike physics this
    // is not merely flavour when present: without it, a model with alternate part
    // sets renders ALL of them: Hiyori shows four arms. Found by eye on device,
    // after this file was skipped as "166 bytes, probably nothing".
    NSString *poseName = settings[@"FileReferences"][@"Pose"];
    if ([poseName isKindOfClass:NSString.class]) {
        NSURL *poseURL = [modelJSONURL.URLByDeletingLastPathComponent
                          URLByAppendingPathComponent:poseName];
        NSData *poseData = [NSData dataWithContentsOfURL:poseURL];
        if (poseData != nil) {
            _pose = CubismPose::Create(
                static_cast<const csmByte *>(poseData.bytes),
                static_cast<csmSizeInt>(poseData.length));
            // Kept for -setPoseFadeDuration:, which rebuilds the pose from this JSON.
            _poseJSON = poseData;
        }
    }

    [self loadMotionsFromSettings:settings baseURL:modelJSONURL.URLByDeletingLastPathComponent];

    return self;
    }  // @synchronized
}

/// Load every authored clip declared under `FileReferences.Motions`. Same failure
/// policy as physics: a clip that's missing or fails Cubism's consistency check is
/// skipped silently; motion is flavour, the model must still load and render.
///
/// Runs inside init's @synchronized block: `CubismMotion::Create` allocates through
/// the process-global Cubism allocator.
- (void)loadMotionsFromSettings:(NSDictionary *)settings baseURL:(NSURL *)baseURL {
    NSDictionary *groups = settings[@"FileReferences"][@"Motions"];
    if (![groups isKindOfClass:NSDictionary.class]) {
        _motionGroupNames = @[];
        return;
    }

    // The model's declared eye/lipsync IDs, for `SetEffectIds`: a clip that carries
    // authored `EyeBlink`/`LipSync` *model* curves composes them into these
    // parameters (multiply for eyes, add for mouth) instead of overwriting.
    // Hiyori's idles ship no such curves; this is for the models that do.
    csmVector<CubismIdHandle> eyeBlinkIds;
    for (NSString *identifier in _eyeBlinkParameterIDs) {
        eyeBlinkIds.PushBack(CubismFramework::GetIdManager()->GetId(identifier.UTF8String));
    }
    csmVector<CubismIdHandle> lipSyncIds;
    for (NSString *identifier in _lipSyncParameterIDs) {
        lipSyncIds.PushBack(CubismFramework::GetIdManager()->GetId(identifier.UTF8String));
    }

    NSMutableArray<NSString *> *loadedGroups = [NSMutableArray array];
    for (NSString *groupName in groups) {
        if (![groupName isKindOfClass:NSString.class]) { continue; }
        NSArray *entries = groups[groupName];
        if (![entries isKindOfClass:NSArray.class]) { continue; }

        std::vector<CubismMotion *> clips;
        for (id entry in entries) {
            if (![entry isKindOfClass:NSDictionary.class]) { continue; }
            NSString *file = entry[@"File"];
            if (![file isKindOfClass:NSString.class]) { continue; }

            NSData *data = [NSData dataWithContentsOfURL:
                            [baseURL URLByAppendingPathComponent:file]];
            if (data == nil) { continue; }
            data = ValidatedMotionData(data);
            if (data == nil) { continue; }

            // Consistency check on: a corrupt user-supplied clip should be skipped
            // here, not fault deep inside curve evaluation later.
            CubismMotion *motion = CubismMotion::Create(
                static_cast<const csmByte *>(data.bytes),
                static_cast<csmSizeInt>(data.length),
                NULL, NULL, true);
            if (motion == nullptr) { continue; }

            // model3.json's per-entry fade beats the clip's own Meta default
            // (Hiyori declares 0.5 s on every entry; Meta's default is 1 s).
            NSNumber *fadeIn = entry[@"FadeInTime"];
            if ([fadeIn isKindOfClass:NSNumber.class] && fadeIn.doubleValue >= 0) {
                motion->SetFadeInTime(static_cast<csmFloat32>(fadeIn.doubleValue));
            }
            NSNumber *fadeOut = entry[@"FadeOutTime"];
            if ([fadeOut isKindOfClass:NSNumber.class] && fadeOut.doubleValue >= 0) {
                motion->SetFadeOutTime(static_cast<csmFloat32>(fadeOut.doubleValue));
            }
            motion->SetEffectIds(eyeBlinkIds, lipSyncIds);

            // Force one-shot even when the clip says `Loop: true` (Hiyori's idles
            // all do). A looping clip NEVER reports finished, so the caller's
            // random re-selection would starve and the character would repeat one
            // clip forever; variety policy lives with the caller, so clips must
            // actually end.
            motion->SetLoop(false);

            clips.push_back(motion);
        }

        if (!clips.empty()) {
            _motions[std::string(groupName.UTF8String)] = std::move(clips);
            [loadedGroups addObject:groupName];
        }
    }

    // NSDictionary iteration order is unspecified; sort so the surface is stable.
    [loadedGroups sortUsingSelector:@selector(compare:)];
    _motionGroupNames = loadedGroups;

    if (!_motions.empty()) {
        _motionManager = CSM_NEW CubismMotionManager();
        // The queue calls this unconditionally when a clip fires UserData.
        // This viewer has no event consumer yet, but must still register a sink.
        _motionManager->SetEventCallback([](const CubismMotionQueueManager *, const csmString &, void *) {});
    }
}

- (void)dealloc {
    @synchronized (CubismRuntime.shared) {
    // Strict order: the model is allocated out of the moc, and the moc is revived in
    // place inside `_mocBuffer`; so model, then moc, then the buffer they both read.
    // The motion manager goes before the clips (its queue entries point into them);
    // physics before the model (it only references the model during Evaluate).
    if (_motionManager != nullptr) { CSM_DELETE(_motionManager); }
    for (auto &group : _motions) {
        for (CubismMotion *motion : group.second) { ACubismMotion::Delete(motion); }
    }
    if (_pose != nullptr) { CubismPose::Delete(_pose); }
    if (_physics != nullptr) { CubismPhysics::Delete(_physics); }
    if (_model != nullptr) { _moc->DeleteModel(_model); }
    if (_moc != nullptr) { CubismMoc::Delete(_moc); }
    if (_mocBuffer != nullptr) { free(_mocBuffer); }
    }  // @synchronized
}

// Both accessors guard on the rig's own parameter list first.
//
// Cubism does NOT ignore an unknown ID: its id manager mints a fresh handle for any
// string, and `SetParameterValue` then resolves that handle to an invalid parameter
// index and writes through it: a segfault, not a no-op. (Found the hard way: the
// "unknown parameter degrades" test was the only one of four that crashed.)
//
// This guard is what makes the documented behaviour actually true, and it matters
// beyond tests: a viseme projection written for one model will name parameters
// another lacks, so swapping models must degrade rather than crash.

- (void)setValue:(float)value forParameterID:(NSString *)parameterID {
    if (_model == nullptr) { return; }
    if (![_knownParameterIDs containsObject:parameterID]) { return; }
    CubismIdHandle identifier = CubismFramework::GetIdManager()->GetId(parameterID.UTF8String);
    _model->SetParameterValue(identifier, value);
}

- (float)valueForParameterID:(NSString *)parameterID {
    if (_model == nullptr) { return 0; }
    if (![_knownParameterIDs containsObject:parameterID]) { return 0; }
    CubismIdHandle identifier = CubismFramework::GetIdManager()->GetId(parameterID.UTF8String);
    return _model->GetParameterValue(identifier);
}

- (void)update {
    if (_model == nullptr) { return; }
    _model->Update();
}

- (BOOL)hasPhysics {
    return _physics != nullptr;
}

- (void)updateWithDeltaTime:(double)deltaTime {
    if (_model == nullptr) { return; }
    // Clamped: after a pause/background the first frame's delta is seconds long,
    // and integrating a physics step that large slingshots the pendulums; hair
    // whips across the screen once on every resume. A tenth of a second keeps a
    // hitch a hitch.
    const double dt = deltaTime < 0 ? 0 : (deltaTime > 0.1 ? 0.1 : deltaTime);
    if (_physics != nullptr) {
        _physics->Evaluate(_model, static_cast<Csm::csmFloat32>(dt));
    }
    // Pose AFTER physics, BEFORE Update: LAppModel's order. It fades part
    // opacities over its FadeInTime, hence the delta.
    if (_pose != nullptr) {
        _pose->UpdateParameters(_model, static_cast<Csm::csmFloat32>(dt));
    }
    _model->Update();
}

- (void)setPoseFadeDuration:(double)seconds {
    if (_poseJSON == nil || seconds < 0) { return; }
    NSDictionary *parsed = [NSJSONSerialization JSONObjectWithData:_poseJSON options:0 error:nil];
    if (![parsed isKindOfClass:NSDictionary.class]) { return; }
    NSMutableDictionary *patched = [parsed mutableCopy];
    patched[@"FadeInTime"] = @(seconds);
    NSData *data = [NSJSONSerialization dataWithJSONObject:patched options:0 error:nil];
    if (data == nil) { return; }

    // Rebuild rather than mutate: CubismPose parses its fade at Create and exposes no
    // setter. Serialized like every other Cubism allocation site.
    @synchronized (CubismRuntime.shared) {
        CubismPose *replacement = CubismPose::Create(
            static_cast<const csmByte *>(data.bytes),
            static_cast<csmSizeInt>(data.length));
        if (replacement == nullptr) { return; }
        if (_pose != nullptr) { CubismPose::Delete(_pose); }
        _pose = replacement;
    }
}

#pragma mark - Authored motions

- (NSArray<NSString *> *)motionGroupNames {
    return _motionGroupNames ?: @[];
}

- (NSInteger)motionCountInGroup:(NSString *)group {
    if (group == nil) { return 0; }
    auto found = _motions.find(std::string(group.UTF8String));
    if (found == _motions.end()) { return 0; }
    return static_cast<NSInteger>(found->second.size());
}

- (BOOL)motionsFinished {
    if (_motionManager == nullptr) { return YES; }
    return _motionManager->IsFinished();
}

- (BOOL)startMotionInGroup:(NSString *)group atIndex:(NSInteger)index {
    if (_model == nullptr || _motionManager == nullptr || group == nil) { return NO; }
    auto found = _motions.find(std::string(group.UTF8String));
    if (found == _motions.end()) { return NO; }
    if (index < 0 || static_cast<size_t>(index) >= found->second.size()) { return NO; }

    // Single-caller API, so no reservation dance: force-priority always starts,
    // and the queue cross-fades the previous clip out over its FadeOutTime.
    // `autoDelete: false`: this handle owns the clips and reuses them.
    const csmInt32 forcePriority = 3;
    _motionManager->SetReservePriority(forcePriority);
    CubismMotionQueueEntryHandle handle = _motionManager->StartMotionPriority(
        found->second[static_cast<size_t>(index)], false, forcePriority);
    return handle != InvalidMotionQueueEntryHandleValue;
}

- (BOOL)evaluateMotionsWithDeltaTime:(double)deltaTime {
    if (_model == nullptr || _motionManager == nullptr) { return NO; }
    // Same clamp as -updateWithDeltaTime:: a resume-from-background delta should
    // read as a hitch, not fast-forward the clip to its end.
    const double dt = deltaTime < 0 ? 0 : (deltaTime > 0.1 ? 0.1 : deltaTime);

    // LAppModel's sandwich. LoadParameters restores the saved base pose, the
    // motion evaluates ON TOP of it (fades blend curve values against that base),
    // and SaveParameters re-saves the result as the next frame's base. External
    // writes (lipsync, blink, gaze) must happen after this returns; LoadParameters
    // discards anything written since the last SaveParameters.
    _model->LoadParameters();
    csmBool updated = false;
    if (!_motionManager->IsFinished()) {
        updated = _motionManager->UpdateMotion(_model, static_cast<csmFloat32>(dt));
    }
    _model->SaveParameters();
    return updated ? YES : NO;
}

#pragma mark - Internal

// Borrowed, never transferred: this handle still owns the model and deletes it in
// dealloc. See CubismModelHandle+Internal.h for why the renderer reaches it this
// way rather than through the public header.
- (Csm::CubismModel *)cubismModel {
    return _model;
}

@end
