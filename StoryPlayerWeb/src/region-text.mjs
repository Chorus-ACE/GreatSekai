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

// Regional scripts can insert staging snippets without changing dialogue order.
// Match repeated references by occurrence, never by their raw timeline offsets.
export function transcriptIndices(source, regional = source) {
  const positions = new Map();
  for (const [index, snippet] of regional.Snippets.entries()) {
    const key = `${snippet.Action}:${snippet.ReferenceIndex}`;
    if (!positions.has(key)) positions.set(key, []);
    positions.get(key).push(index);
  }
  const occurrences = new Map();
  return source.Snippets.map(snippet => {
    const key = `${snippet.Action}:${snippet.ReferenceIndex}`;
    const occurrence = occurrences.get(key) ?? 0;
    occurrences.set(key, occurrence + 1);
    return positions.get(key)?.[occurrence] ?? null;
  });
}

// Progress also reports concurrent staging actions. Keep the current readable
// line highlighted through those actions, until the next dialogue or caption.
export function activeTranscriptIndices(source, regional = source) {
  const mapped = transcriptIndices(source, regional);
  let current = null;
  return source.Snippets.map((snippet, index) => {
    const isTalk = snippet.Action === 1 && source.TalkData[snippet.ReferenceIndex]?.Body;
    const effect = snippet.Action === 6 ? source.SpecialEffectData[snippet.ReferenceIndex] : null;
    const isCaption = effect && [8, 18, 24, 38].includes(effect.EffectType) && effect.StringVal;
    if (isTalk || isCaption) current = mapped[index];
    return current;
  });
}
