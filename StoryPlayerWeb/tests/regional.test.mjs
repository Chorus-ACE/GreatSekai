import test from 'node:test';
import assert from 'node:assert/strict';
import { applyRegionText } from '../src/region-text.mjs';
import { ASSET_ROOTS, createResolver } from '../src/resolver.mjs';

const scenario = () => ({
  ScenarioId: 'jp', Snippets: [{ Action: 1, ReferenceIndex: 0 }],
  TalkData: [{ WindowDisplayName: '初音ミク', Body: 'こんにちは', Voices: [{ VoiceId: 'jp-voice' }], TalkCharacters: [{ Character2dId: 21 }] }],
  SpecialEffectData: [{ EffectType: 18, StringVal: 'セカイ' }, { EffectType: 1, StringVal: 'background' }]
});
test('aligned regional text preserves JP voices, effects and original data', () => {
  const jp = scenario(), cn = scenario();
  cn.TalkData[0].Body = '你好'; cn.TalkData[0].Voices = [];
  cn.SpecialEffectData[0].StringVal = '世界'; cn.SpecialEffectData[1].StringVal = 'different-background';
  const result = applyRegionText(jp, cn);
  assert.equal(result.TalkData[0].Body, '你好');
  assert.deepEqual(result.TalkData[0].Voices, jp.TalkData[0].Voices);
  assert.equal(result.SpecialEffectData[0].StringVal, '世界');
  assert.equal(result.SpecialEffectData[1].StringVal, 'background');
  assert.equal(jp.TalkData[0].Body, 'こんにちは');
});
test('rejects mismatched regional dialogue count, order, speakers and effects', () => {
  for (const change of [s => s.TalkData.push(s.TalkData[0]), s => s.Snippets[0].ReferenceIndex++, s => s.TalkData[0].TalkCharacters[0].Character2dId++, s => s.SpecialEffectData[0].EffectType++]) {
    const other = scenario(); change(other);
    assert.throws(() => applyRegionText(scenario(), other), /regionalMismatch/);
  }
});
test('resolver retains costume-specific motions, regional source and event-only sound paths', () => {
  const model = { dir: 'models/ichika/normal', model3: 'normal.model3', motionBase: 'motion/base' };
  const sibling = { dir: 'models/ichika/dress', motions: ['nod'] };
  const r = createResolver(ASSET_ROOTS[0], { models: { model, sibling }, se: {}, movies: {} }, { eventBundle: 'real_jp_bundle' });
  assert.equal(r.motion(model, 'motion', 'NOD'), ASSET_ROOTS[0] + '/models/ichika/dress/motions/nod.motion3.json');
  assert.equal(r.motion(model, 'facial', 'SMILE'), ASSET_ROOTS[0] + '/motion/base/facial/smile.motion3.json');
  assert.deepEqual(r.se('bell'), [ASSET_ROOTS[0] + '/ondemand/event_story/real_jp_bundle/scenario_se/bell.mp3']);
  assert.equal(r.fallback(r.model(model)), ASSET_ROOTS[1] + '/models/ichika/normal/normal.model3');
  assert.equal(r.fallback('https://unrelated.example/file'), null);
});
