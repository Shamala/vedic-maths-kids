// Generates PNG icons from the Cupcake Hero artwork. Run once: npm run icons
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

import { cupcakeSVG } from '../src/art.js';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8fb8"/><stop offset="1" stop-color="#e8458b"/></linearGradient></defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <g transform="translate(76 56) scale(2.25)">${cupcakeSVG({ id: 'ic' })}</g>
</svg>`;

writeFileSync('public/icons/icon.svg', svg);
for (const [name, size] of [['icon-192', 192], ['icon-512', 512], ['apple-touch-icon', 180]]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(`public/icons/${name}.png`);
}
console.log('icons done');
