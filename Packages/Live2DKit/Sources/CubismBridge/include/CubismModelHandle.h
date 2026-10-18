//
//  CubismModelHandle.h
//  Live2DKit
//
//  Loading and parameter access for one Live2D model. Rendering is deliberately
//  NOT here: that needs a Metal device and a drawable, and keeping it separate
//  means loading can be tested headlessly.
//

#pragma once

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/// A loaded Cubism model: its parameters, and the groups that say which of them
/// drive the mouth and eyes.
///
/// Those groups matter more than they look. Models do NOT agree on parameter
/// names (Hiyori and Haru drive lipsync through `ParamMouthOpenY`, Mao through
/// `ParamA`), so anything hard-coding an ID works for one model and silently does
/// nothing for the next. `model3.json` declares `LipSync` and `EyeBlink` groups
/// precisely so a runtime can ask instead of guess.
@interface CubismModelHandle : NSObject

/// Load a model from its `.model3.json`. Textures, physics and pose are resolved
/// relative to that file's directory, per the Cubism convention.
///
/// Returns nil and populates `error` rather than trapping: a missing or malformed
/// model is a normal failure for a user-supplied file, not a programmer error.
///
/// Spelled as a real `init…` rather than a `+modelWith…` factory deliberately:
/// Swift imports a class factory as an initialiser only when its prefix matches
/// the class name, so `+modelWithContentsOfURL:` would arrive as a static method
/// and `CubismModelHandle(contentsOfURL:)` wouldn't resolve.
- (nullable instancetype)initWithContentsOfURL:(NSURL *)modelJSONURL
                                         error:(NSError **)error;

- (instancetype)init NS_UNAVAILABLE;

/// Every parameter the model exposes, in index order.
@property (nonatomic, readonly) NSArray<NSString *> *parameterIDs;

/// Parameter IDs in the model's `LipSync` group: usually one, an openness value.
/// Empty when the model declares no such group.
@property (nonatomic, readonly) NSArray<NSString *> *lipSyncParameterIDs;

/// Parameter IDs in the model's `EyeBlink` group: usually left and right eyes.
@property (nonatomic, readonly) NSArray<NSString *> *eyeBlinkParameterIDs;

/// Set a parameter by ID. Unknown IDs are ignored rather than trapping, so a
/// projection written against one model degrades on another instead of crashing.
- (void)setValue:(float)value forParameterID:(NSString *)parameterID;

/// Read a parameter back. Returns 0 for an unknown ID.
- (float)valueForParameterID:(NSString *)parameterID;

/// Push queued parameter changes into the model's vertex state. Call once per
/// frame after setting parameters, before drawing.
- (void)update;

/// Whether the model shipped a physics3.json that parsed. Physics is optional
/// flavour: a model without it renders and lipsyncs, it just holds stiller.
@property (nonatomic, readonly) BOOL hasPhysics;

/// Per-frame update WITH physics: evaluates the physics simulation (hair, clothes
/// secondary motion) over `deltaTime` seconds, then pushes parameters to the vertex
/// state. Use instead of `-update` when animating; identical when the model has no
/// physics. Delta is clamped to 0.1 s so a resume-from-background hitch cannot
/// slingshot the pendulums.
- (void)updateWithDeltaTime:(double)deltaTime;

/// Override the pose3.json part-swap fade (its `FadeInTime`, seconds). The pose fade
/// is what cross-dissolves swappable part groups (Hiyori: arm set A ↔ B); the file's
/// authored value (0.5 s for Hiyori) is tuned for a model that rarely swaps, and a
/// rotating idle that crosses arm sets shows both translucent arm sets for that long.
/// Explicit and caller-opt-in: the artist's file is never modified, and a model
/// without a pose (or a negative value) ignores this. No-op on failure.
- (void)setPoseFadeDuration:(double)seconds;

#pragma mark - Authored motions (.motion3.json)

/// Names of the motion groups the model ships (`FileReferences.Motions`, e.g.
/// "Idle", "TapBody"), sorted, restricted to groups with at least one clip that
/// actually parsed. Empty when the model ships no motions; motion is flavour,
/// never load-bearing, so a missing or corrupt clip degrades instead of failing
/// the load (same policy as physics).
@property (nonatomic, readonly) NSArray<NSString *> *motionGroupNames;

/// How many clips loaded in `group`; 0 for an unknown group.
- (NSInteger)motionCountInGroup:(NSString *)group NS_SWIFT_NAME(motionCount(inGroup:));

/// YES when no motion is playing, including before any was started. The caller
/// owns the *policy* (which clip, when, random selection); this is the mechanism.
@property (nonatomic, readonly) BOOL motionsFinished;

/// Begin playing a clip. Any playing clip cross-fades out over its FadeOutTime
/// while the new one fades in; the fade times come from `model3.json`'s Motions
/// entries (falling back to the clip's own Meta). Returns NO for an unknown
/// group/index or a model without motions.
- (BOOL)startMotionInGroup:(NSString *)group
                   atIndex:(NSInteger)index NS_SWIFT_NAME(startMotion(group:index:));

/// Evaluate the active motions over `deltaTime` seconds (clamped like
/// `-updateWithDeltaTime:`), writing their curve values into the model's
/// parameters. Returns YES if a motion wrote anything.
///
/// Call order per frame is a contract: `evaluateMotionsWithDeltaTime:` FIRST, then
/// any external parameter writes (lipsync, blink, gaze: they read the motion's
/// values via `-valueForParameterID:` and compose), then `-updateWithDeltaTime:`.
/// Internally this wraps the update in Cubism's LoadParameters/SaveParameters
/// sandwich (LAppModel's order), which is what makes clip cross-fades blend from
/// the saved base pose instead of from whatever the last external write left, and
/// equally why external writes must come AFTER: anything written before this call
/// is discarded by LoadParameters.
- (BOOL)evaluateMotionsWithDeltaTime:(double)deltaTime NS_SWIFT_NAME(evaluateMotions(deltaTime:));

@end

NS_ASSUME_NONNULL_END
