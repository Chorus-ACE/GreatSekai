import test from 'node:test';
import assert from 'node:assert/strict';
import { transcriptIndices, activeTranscriptIndices } from '../src/region-text.mjs';

const talk = ref => ({ Action: 1, ReferenceIndex: ref });
const effect = ref => ({ Action: 6, ReferenceIndex: ref });

test('native transcript indices follow regional insertions and repeated dialogue', () => {
  const jp = { Snippets: [effect(0), talk(0), talk(1), talk(0), effect(1)] };
  const regional = { Snippets: [effect(0), effect(2), talk(0), talk(1), effect(3), talk(0)] };
  assert.deepEqual(transcriptIndices(jp, regional), [0, 2, 3, 5, null]);
});

test('JP transcript keeps original snippet indices', () => {
  const jp = { Snippets: [effect(0), talk(0), talk(1), talk(0)] };
  assert.deepEqual(transcriptIndices(jp), [0, 1, 2, 3]);
});

test('concurrent staging retains the active dialogue and captions replace it', () => {
  const jp = {
    Snippets: [effect(0), talk(0), effect(0), talk(1), effect(1), effect(0)],
    TalkData: [{ Body: 'First' }, { Body: 'Second' }],
    SpecialEffectData: [{ EffectType: 1 }, { EffectType: 8, StringVal: 'Caption' }]
  };
  assert.deepEqual(activeTranscriptIndices(jp), [null, 1, 1, 3, 4, 4]);
});
