import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Re-run after editing any stylesheet. No external build dependencies.
const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const sheets = await Promise.all(['fonts.css', 'style.css', 'offer.css'].map(name => fs.readFile(path.join(dist, name), 'utf8')));
let css = sheets.join('\n').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
let html = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
const fonts = await fs.readdir(path.join(dist, 'assets/fonts'));
for (const prefix of ['barlow-condensed-800-latin-', 'barlow-400-latin-']) {
  const font = fonts.find(name => name.startsWith(prefix) && /^[0-9a-f]{10}\.woff2$/.test(name.slice(prefix.length)));
  if (!font) throw new Error(`Missing critical font: ${prefix}`);
  const bytes = await fs.readFile(path.join(dist, 'assets/fonts', font));
  css = css.replace(`url(assets/fonts/${font})`, `url(data:font/woff2;base64,${bytes.toString('base64')})`);
}
html = html.replace(/\n?<link rel="preload"[^>]+>/g, '');
const style = `<style id="site-styles">${css}</style>`;
if (html.includes('<style id="site-styles">')) {
  html = html.replace(/<style id="site-styles">[\s\S]*?<\/style>/, style);
} else {
  html = html.replace('<link rel="stylesheet" href="style.css"><link rel="stylesheet" href="offer.css">', style);
}
await fs.writeFile(path.join(dist, 'index.html'), html);
console.log('Original page styles inlined; no render-blocking stylesheet requests.');
