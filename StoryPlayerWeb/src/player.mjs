import { PjskPlayer, DEFAULT_MENU, scriptLines } from 'pjsk-scenario-player';
import { ASSET_ROOTS, createResolver } from './resolver.mjs';
import { applyRegionText } from './region-text.mjs';
import './style.css';

const stage = document.querySelector('#stage');
const log = document.querySelector('#log');
const lines = document.querySelector('#lines');
const close = document.querySelector('#close-log');
const post = (type, detail = {}) => window.webkit?.messageHandlers?.storyPlayer?.postMessage({ type, ...detail });
let player;
let config;
let request;
let generation = 0;
let active = true;
let snippet = 0;
let modes;

async function json(url, signal) {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal.aborted) abort(); else signal.addEventListener('abort', abort, { once: true });
  const timer = setTimeout(abort, 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
    signal.removeEventListener('abort', abort);
  }
}

async function assetIndex(signal) {
  let error;
  for (const root of ASSET_ROOTS) {
    try {
      const index = await json(`${root}/story-player/index.json?h=${Math.floor(Date.now() / 3600000)}`, signal);
      if (!index.models || !index.se || !index.movies) throw new Error('Invalid story asset index');
      return { index, root };
    } catch (e) { if (signal.aborted) throw e; error = e; }
  }
  throw error;
}

function destroy() {
  ++generation;
  request?.abort();
  request = undefined;
  player?.destroy();
  player = undefined;
  log.close();
  lines.replaceChildren();
}

async function mount() {
  destroy();
  if (!active || !config) return;
  const mine = generation;
  request = new AbortController();
  const signal = request.signal;
  try {
    post('loading');
    const scenario = config.regional ? applyRegionText(config.scenario, config.regional) : config.scenario;
    const { index, root } = await assetIndex(signal);
    let character2ds = new Map();
    if (scenario.TalkData.some(t => t.Voices?.some(v => v.VoiceId?.startsWith('partvoice')))) {
      const records = await json('https://sekai-api-cdn.haruki.seiunx.com/v1/master/jp/files/character2ds.json', signal);
      character2ds = new Map(records.map(c => [c.id, { assetName: c.assetName, unit: c.unit }]));
    }
    if (mine !== generation) return;
    const assets = createResolver(root, index, { ...config, character2ds });
    const instance = new PjskPlayer(stage, {
      assets, models: index.models, fonts: false,
      locale: config.uiLocale, labels: config.labels,
      textScript: config.textScript, autoplay: false, preload: true,
      auto: modes?.auto ?? true, muted: modes?.muted ?? false, voice: modes?.voice ?? true,
      cubismCoreUrl: `${root}/story-player/v1/lib/live2dcubismcore.min.js`,
      menu: DEFAULT_MENU
    });
    player = instance;
    if (modes) { instance.setFast(modes.fast); instance.setUiHidden(modes.uiHidden); }
    instance.on('mode', value => { if (mine === generation) modes = value; });
    close.textContent = config.closeLabel;
    log.setAttribute('aria-label', config.labels.menu.log);
    document.documentElement.lang = config.language;
    instance.on('error', ({ error }) => { if (mine === generation) post('error', { message: error.message }); });
    instance.on('loading', ({ failed }) => { if (mine === generation && failed.length) post('missingModels', { count: failed.length }); });
    let restore = snippet;
    instance.on('play', () => {
      if (mine !== generation) return;
      if (restore > 0) {
        const index = restore;
        restore = 0;
        // The engine emits play immediately before installing its jump continuation.
        // Restore in the next microtask, once that continuation exists.
        queueMicrotask(() => { if (mine === generation) void instance.jumpTo(index); });
      }
      post('playing');
    });
    instance.on('progress', ({ index, total }) => {
      if (mine !== generation) return;
      snippet = index;
      post('progress', { index, total });
      for (const button of lines.children) {
        const current = Number(button.dataset.index) === index;
        button.classList.toggle('current', current);
        if (current) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
      }
    });
    instance.on('end', () => { if (mine === generation) post('ended'); });
    instance.on('log', () => {
      if (log.open) log.close(); else { log.showModal(); instance.setLogActive(true); }
    });
    for (const line of scriptLines(scenario)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.index = line.index;
      button.textContent = `${line.name ? line.name + '\n' : ''}${line.body}`;
      button.addEventListener('click', () => { log.close(); void instance.jumpTo(line.index); });
      lines.append(button);
    }
    // The engine now owns its loading/retry/start overlays.
    post('prepared');
    await instance.load(scenario, { autoplay: false });
    if (mine === generation) post('loaded');
  } catch (error) {
    if (mine === generation && !signal.aborted) post('error', { message: error.message });
  }
}

close.addEventListener('click', () => log.close());
log.addEventListener('close', () => player?.setLogActive(false));
window.storyPlayer = {
  load(value) { config = value; snippet = 0; modes = undefined; return mount(); },
  setActive(value) {
    if (active === value) return;
    active = value;
    if (active) void mount(); else destroy();
  },
  destroy() { active = false; config = undefined; destroy(); }
};
window.addEventListener('pagehide', () => window.storyPlayer.destroy());
window.addEventListener('unhandledrejection', event => post('error', { message: String(event.reason?.message ?? event.reason) }));
post('ready');
