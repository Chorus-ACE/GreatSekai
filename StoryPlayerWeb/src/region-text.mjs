// Preserve JP staging/audio; only replace text after checking the regional script's structure.
const textEffects = new Set([8, 18, 23, 24]);
const dialogueOrder = scn => scn.Snippets.filter(s => s.Action === 1).map(s => s.ReferenceIndex);
const speakers = talk => (talk.TalkCharacters ?? []).map(c => c.Character2dId);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function applyRegionText(jp, regional) {
  if (!Array.isArray(jp.TalkData) || !Array.isArray(regional.TalkData)
      || jp.TalkData.length !== regional.TalkData.length
      || !same(dialogueOrder(jp), dialogueOrder(regional))
      || !jp.TalkData.every((t, i) => same(speakers(t), speakers(regional.TalkData[i])))
      || !same((jp.SpecialEffectData ?? []).map(e => e.EffectType), (regional.SpecialEffectData ?? []).map(e => e.EffectType))) {
    throw new Error('regionalMismatch');
  }
  return {
    ...jp,
    TalkData: jp.TalkData.map((talk, i) => ({
      ...talk,
      WindowDisplayName: regional.TalkData[i].WindowDisplayName,
      Body: regional.TalkData[i].Body
    })),
    SpecialEffectData: (jp.SpecialEffectData ?? []).map((effect, i) => textEffects.has(effect.EffectType)
      ? { ...effect, StringVal: regional.SpecialEffectData[i].StringVal } : effect)
  };
}
