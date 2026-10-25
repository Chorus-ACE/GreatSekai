import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';

// Keep complete notices with every generated bundle, including transitive dependencies.
function notices() {
  return {
    name: 'third-party-notices',
    generateBundle(_options, bundle) {
      const lock = JSON.parse(readFileSync(new URL('./package-lock.json', import.meta.url)));
      const modules = Object.values(bundle).filter(b => b.type === 'chunk').flatMap(b => Object.keys(b.modules));
      const sections = ['GreatSekai embedded story player\nEngine: pjsk-scenario-player 0.5.2\nhttps://github.com/Team-Haruki/sekai-scenario-player\nResource resolver adapted from Haruki-Toolbox revision 6027fc8f9789df7b94fbd1fc7e7dd1bcfb45d4f6\nLive2D Cubism Core and game assets are loaded separately and are not covered by these licenses.'];
      for (const [path, entry] of Object.entries(lock.packages)) {
        if (!path || !modules.some(id => id.includes(`/${path}/`))) continue;
        let license;
        for (const name of ['LICENSE', 'LICENSE.txt', 'LICENSE.md', 'LICENSE-MIT.txt', 'license', 'license.md']) {
          try { license = readFileSync(new URL(`./${path}/${name}`, import.meta.url), 'utf8'); break; } catch {}
        }
        if (!license && path === 'node_modules/@pixi/colord') license = readFileSync(new URL('./licenses/colord-LICENSE', import.meta.url), 'utf8');
        if (!license && path.startsWith('node_modules/@pixi/')) license = readFileSync(new URL('./node_modules/pixi.js/LICENSE', import.meta.url), 'utf8');
        if (!license) throw new Error(`Missing license: ${path}`);
        sections.push(`${path} ${entry.version}\n\n${license}`);
      }
      // The published player prebundles this dependency into its Cubism chunk,
      // so Rollup's module list only identifies pjsk-scenario-player itself.
      sections.push(`@sekai-world/pixi-live2d-display-mulmotion v0.5.1\nhttps://github.com/Sekai-World/pixi-live2d-display\n\n${readFileSync(new URL('./licenses/pixi-live2d-display-LICENSE', import.meta.url), 'utf8')}`);
      sections.push(`Live2D Cubism Web Framework (included in pixi-live2d-display)\n\n${readFileSync(new URL('./licenses/Live2D-Open-Software-LICENSE.txt', import.meta.url), 'utf8')}`);
      sections.push(readFileSync(new URL('./HARUKI-TOOLBOX-LICENSE', import.meta.url), 'utf8'));
      this.emitFile({ type: 'asset', fileName: 'THIRD_PARTY_NOTICES.txt', source: sections.join('\n\n--------------------\n\n') });
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [notices()],
  build: {
    target: 'safari17',
    outDir: '../GreatSekai/Resources/StoryPlayerWeb.bundle',
    emptyOutDir: true,
    // No module preload polyfill; WKWebView serves the local entry through a custom scheme.
    modulePreload: false
  }
});
