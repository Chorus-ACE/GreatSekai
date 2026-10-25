// Adapted from Team-Haruki/Haruki-Toolbox, engine/urls.ts (MIT).
// Revision 6027fc8f9789df7b94fbd1fc7e7dd1bcfb45d4f6. See HARUKI-TOOLBOX-LICENSE.
export const ASSET_ROOTS = ['https://sekai-assets-haruki.seiunx.net/jp-assets', 'https://sekai-assets-cn03-she01-cdn.haruki.seiunx.com/jp-assets'];

export function createResolver(root, index, episode) {
  const jp = path => `${root}/${path}`;
  const player = path => jp(`story-player/v1/${path}`);
  return {
    scenario: id => jp(`${id}.json`),
    modelManifest: () => jp('story-player/index.json'),
    model: m => jp(`${m.dir}/${m.model3}`),
    physics: m => m.physics ?? null,
    motion: (m, kind, name) => {
      const clip = name.toLowerCase();
      if (kind === 'motion') {
        const parent = m.dir.slice(0, m.dir.lastIndexOf('/') + 1);
        const owner = m.motions?.includes(clip) ? m : Object.values(index.models).find(e => e.dir.startsWith(parent) && e.motions?.includes(clip));
        if (owner) return jp(`${owner.dir}/motions/${clip}.motion3.json`);
      }
      return m.motionBase ? jp(`${m.motionBase}/${kind}/${clip}.motion3.json`) : null;
    },
    bgm: id => [jp(`ondemand/sound/scenario/bgm/${id}/${id}.mp3`), jp(`startapp/sound/scenario/bgm/${id}/${id}.mp3`)],
    se: id => index.se[id] ? [jp(index.se[id])] : episode.eventBundle ? [jp(`ondemand/event_story/${episode.eventBundle}/scenario_se/${id}.mp3`)] : [],
    voice: (scenario, voice, _ctx, info) => {
      const dirs = ['ondemand/sound/scenario/voice', 'ondemand/sound/card_scenario/voice', 'startapp/sound/scenario/voice'];
      if (episode.kind === 'card') dirs.unshift(dirs.splice(1, 1)[0]);
      const urls = dirs.map(d => jp(`${d}/${scenario}/${voice}.mp3`));
      const character = episode.character2ds?.get(info?.character2dId);
      if (voice.startsWith('partvoice') && character) {
        const asset = character.assetName;
        const unit = !character.unit || character.unit === 'none' ? 'piapro' : character.unit;
        const part = asset.startsWith('v2_') ? [] : [`startapp/sound/scenario/voice/part_voice_v2_${asset}_${unit}`];
        part.push(`startapp/sound/scenario/voice/part_voice_${asset}_${unit}`, `startapp/sound/scenario/voice/part_voice_${asset}`, `tutorial/sound/scenario/part_voice/${asset}_${unit}`);
        urls.unshift(...part.map(d => jp(`${d}/${voice}.mp3`)));
      }
      return urls;
    },
    background: id => [jp(`ondemand/scenario/background/${id}/${id}.png`), jp(`startapp/scenario/background/${id}/${id}.png`), jp(`ondemand/scenario/background/${id}/scenariobgdata.assets/texture2d/${id}.png`)],
    movie: name => index.movies[name] ? jp(index.movies[name]) : null,
    fx: path => player(`fx/${path}`),
    ui: path => player(`ui/${path}`),
    font: file => player(`fonts/${file}`),
    fallback: url => {
      for (const from of ASSET_ROOTS) {
        if (url.startsWith(`${from}/`)) return ASSET_ROOTS.find(r => r !== from) + url.slice(from.length);
      }
      return null;
    }
  };
}
