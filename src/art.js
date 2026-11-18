// Original SVG artwork as plain strings, shared by the app and the icon generator.
// Cupcake Hero: gold "C" chain, cool shades, red cape. viewBox 0 0 160 180.

const BITES = [
  [136, 86, 15], [24, 88, 15], [108, 142, 17], [52, 144, 17], [80, 24, 16], [80, 98, 42],
];

export const MAX_BITES = BITES.length;

const f1 = (n) => Math.round(n * 10) / 10;
const bez = (t, p0, p1, p2) => {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
};
const bezAngle = (t, p0, p1, p2) =>
  (Math.atan2(2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]), 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0])) * 180) / Math.PI;

const sparkle = (x, y, r) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="#fff"/>`;

// Cupcake Hero: glossy swirl, Wayfarer shades, chunky gold "C" chain, ribbed wrapper, red cape.
export function cupcakeSVG({ bites = 0, mood = 'cool', id = 'cc' } = {}) {
  const cuts = BITES.slice(0, bites).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('');
  const mouth =
    mood === 'hit'
      ? '<ellipse cx="80" cy="88" rx="6.5" ry="7.5" fill="#6b1d1d"/><ellipse cx="80" cy="91" rx="3.5" ry="3" fill="#ff7b9c"/>'
      : mood === 'win'
        ? '<path d="M63 83 Q80 103 97 83 Z" fill="#6b1d1d"/><path d="M70 90 Q80 98 90 90 Q80 86 70 90Z" fill="#ff7b9c"/>'
        : '<path d="M66 84 Q80 93 96 82" stroke="#5a1424" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M94.5 80 L98 82 L95 85.5" stroke="#5a1424" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';

  const sprinkles = [
    [66, 28, -15, '#7ae582'], [92, 31, -25, '#9b5de5'], [49, 41, -35, '#4cc9f0'], [91, 42, 55, '#ff6b81'], [106, 43, 30, '#ffd60a'],
    [36, 78, 35, '#ffd60a'], [53, 87, 45, '#ff6b9c'], [107, 86, -50, '#ff6b81'], [127, 80, -40, '#4cc9f0'], [72, 98, -15, '#7ae582'],
  ]
    .map(([x, y, r, c]) => `<rect x="${x - 5.5}" y="${y - 2.2}" width="11" height="4.4" rx="2.2" fill="${c}" stroke="#fff" stroke-opacity=".5" stroke-width=".8" transform="rotate(${r} ${x} ${y})"/>`)
    .join('');

  const ribs = [1, 2, 3, 4, 5].map((i) => `<path d="M${41 + i * 13} 103 L${49 + i * 10.4} 156" stroke="#cf8f17" stroke-width="2" stroke-linecap="round" opacity=".85"/>`).join('');

  const P0 = [24, 84], P1 = [80, 128], P2 = [138, 84];
  let links = '';
  const N = 15;
  for (let i = 0; i <= N; i++) {
    const t = 0.02 + (i * 0.96) / N;
    const [x, y] = bez(t, P0, P1, P2);
    const ang = bezAngle(t, P0, P1, P2);
    const face = i % 2 === 0;
    const rx = face ? 6.4 : 4.4, ry = face ? 4.4 : 2.7;
    links += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"><ellipse rx="${rx}" ry="${ry}" fill="none" stroke="#8a5a00" stroke-width="4.8"/><ellipse rx="${rx}" ry="${ry}" fill="none" stroke="url(#${id}g)" stroke-width="3"/></g>`;
  }

  return `
<defs>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="-10" y="0" width="180" height="180"><rect x="-10" width="180" height="180" fill="#fff"/>${cuts}</mask>
  <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc6dc"/><stop offset="1" stop-color="#ff8db7"/></linearGradient>
  <linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3b030"/><stop offset=".45" stop-color="#ffe27a"/><stop offset="1" stop-color="#f0a928"/></linearGradient>
  <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3a8"/><stop offset=".5" stop-color="#ffc933"/><stop offset="1" stop-color="#d9971a"/></linearGradient>
  <radialGradient id="${id}c" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff6b78"/><stop offset="1" stop-color="#c1121f"/></radialGradient>
  <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a5a5b0"/><stop offset="1" stop-color="#26262f"/></linearGradient>
  <linearGradient id="${id}p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f23a45"/><stop offset="1" stop-color="#b5121d"/></linearGradient>
</defs>
<g class="cape">
  <path d="M30 84 C14 102 3 128 1 150 L21 175 C29 161 40 158 56 163 C72 168 86 166 101 160 C118 154 130 158 146 151 C156 147 163 142 168 137 C152 130 146 108 136 86 Z" fill="url(#${id}p)" stroke="#7a0a12" stroke-width="3" stroke-linejoin="round"/>
  <path d="M44 98 C35 120 29 140 27 158 C44 154 57 160 72 162 L90 162 C106 158 122 156 134 150 C131 130 126 108 116 98 Z" fill="#a30f1a" opacity=".85"/>
  <path d="M26 96 C14 114 8 134 7 152 M148 126 C156 132 160 134 164 136" stroke="#ff8d8d" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
</g>
<g mask="url(#${id}m)">
  <path d="M41 102 L119 102 L111 155 Q80 163 49 155 Z" fill="url(#${id}w)" stroke="#b07410" stroke-width="3" stroke-linejoin="round"/>
  ${ribs}
  <path d="M52 112 L57 148" stroke="#fff6c8" stroke-width="3" stroke-linecap="round" opacity=".7"/>
  <ellipse cx="80" cy="86" rx="58" ry="19" fill="url(#${id}f)" stroke="#e0568f" stroke-width="3"/>
  <path d="M34 94 Q52 104 70 99" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/>
  <ellipse cx="80" cy="62" rx="45" ry="22" fill="url(#${id}f)" stroke="#e0568f" stroke-width="3"/>
  <path d="M42 70 Q48 80 64 83" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".45"/>
  <path d="M50 38 C50 24 66 20 72 12 Q80 8 88 12 C94 20 110 24 110 38 C110 50 50 50 50 38Z" fill="url(#${id}f)" stroke="#e0568f" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 36 Q80 46 100 34 M66 27 Q82 33 96 26" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".5"/>
  <circle cx="80" cy="15" r="10.5" fill="url(#${id}c)" stroke="#7a0a12" stroke-width="2.6"/>
  <ellipse cx="76" cy="10.5" rx="4" ry="2.6" fill="#fff" opacity=".85" transform="rotate(-30 76 10.5)"/>
  ${sprinkles}
  <circle cx="43" cy="76" r="7" fill="#ffd633" stroke="#e0a800" stroke-width="2"/><circle cx="117" cy="76" r="7" fill="#ffd633" stroke="#e0a800" stroke-width="2"/>
  <circle cx="58" cy="91" r="5" fill="#ff5d8f" opacity=".4"/><circle cx="102" cy="91" r="5" fill="#ff5d8f" opacity=".4"/>
  <g class="shades">
    <path d="M37 51 Q80 44 123 51 L120 70 Q119 79 108 79 L90 79 Q85 79 84 72 L83 67 Q80 63 77 67 L76 72 Q75 79 70 79 L52 79 Q41 79 40 70 Z" fill="#15151d" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M44 55.5 L76 56 L74.5 70 Q73.5 75 68 75 L55 75 Q47.5 75 46 69 Z" fill="url(#${id}l)"/>
    <path d="M84 56 L116 55.5 L114 69 Q112.5 75 105 75 L92 75 Q86.5 75 85.5 70 Z" fill="url(#${id}l)"/>
    <path d="M55 56 L63 56 L56 75 L48 75Z M66 56 L70 56 L64 75 L60 75Z M95 56 L103 56 L96 75 L88 75Z M106 56 L110 56 L104 75 L100 75Z" fill="#fff" opacity=".32"/>
    <ellipse cx="41" cy="53.5" rx="2.3" ry="1.2" fill="#ffc933"/><ellipse cx="119" cy="53.5" rx="2.3" ry="1.2" fill="#ffc933"/>
  </g>
  ${mouth}
  ${links}
  <circle cx="80" cy="107" r="15.5" fill="url(#${id}g)" stroke="#8a5a00" stroke-width="3"/>
  <circle cx="80" cy="107" r="11.6" fill="none" stroke="#b9801a" stroke-width="1.6"/>
  <path d="M86 101.6 A7.6 7.6 0 1 0 86 112.4" stroke="#9a6500" stroke-width="4.6" fill="none" stroke-linecap="round"/>
  <path d="M86 101.6 A7.6 7.6 0 1 0 86 112.4" stroke="#ffe27a" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8" transform="translate(-.5 -.8)"/>
  ${sparkle(33, 98, 5)}${sparkle(129, 98, 5)}${sparkle(92, 94, 4)}
</g>`;
}

const MONSTERS = {
  gloop: { c: '#5ccf5c', d: '#2f9e44', eyes: 2, extra: 'none' },
  grumblor: { c: '#9b5de5', d: '#6a35b8', eyes: 1, extra: 'horns' },
  chompy: { c: '#ff8c42', d: '#c4571b', eyes: 2, extra: 'spikes' },
  spiky: { c: '#2ec4b6', d: '#17877d', eyes: 2, extra: 'spikes' },
  sneaky: { c: '#4361ee', d: '#2d3fb0', eyes: 3, extra: 'antenna' },
  boss: { c: '#e63946', d: '#8b0a14', eyes: 2, extra: 'horns' },
};
export const MONSTER_KINDS = Object.keys(MONSTERS);

// Monster, facing left. viewBox 0 0 140 140.
export function monsterSVG(kind = 'gloop') {
  const { c, d, eyes, extra } = MONSTERS[kind] || MONSTERS.gloop;
  const eyePos = { 1: [[70, 68, 17]], 2: [[50, 68, 13], [90, 68, 13]], 3: [[44, 70, 10], [70, 58, 11], [96, 70, 10]] }[eyes];
  const eyeSVG = eyePos
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#222" stroke-width="2.5"/><circle cx="${x - r * 0.3}" cy="${y + 1}" r="${r * 0.46}" fill="#1b1b1b"/>`)
    .join('');
  const brows = eyes === 1 ? '' : eyePos.map(([x, y, r], i) => `<path d="M${x - r} ${y - r - 3 + (i % 2 ? 6 : 0)} L${x + r} ${y - r + 5 - (i % 2 ? 6 : 0)}" stroke="#222" stroke-width="4" stroke-linecap="round"/>`).join('');
  const teeth = [46, 60, 74, 88].map((x) => `<path d="M${x} 93 l9 0 l-4.5 12 z" fill="#fff"/>`).join('');
  let deco = '';
  if (extra === 'horns') deco = `<path d="M30 46 L20 12 L48 36Z M110 46 L120 12 L92 36Z" fill="#fff2cc" stroke="#222" stroke-width="3" stroke-linejoin="round"/>`;
  if (extra === 'spikes') deco = [34, 50, 66, 82, 98].map((x, i) => `<path d="M${x} ${40 - (i % 2) * 4} l8 -20 l8 20z" fill="${d}" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>`).join('');
  if (extra === 'antenna') deco = `<path d="M70 30 L70 10" stroke="#222" stroke-width="4"/><circle cx="70" cy="8" r="7" fill="#ffd166" stroke="#222" stroke-width="3"/>`;
  return `
${deco}
<ellipse cx="46" cy="130" rx="16" ry="8" fill="${d}" stroke="#222" stroke-width="3"/><ellipse cx="96" cy="130" rx="16" ry="8" fill="${d}" stroke="#222" stroke-width="3"/>
<path d="M18 120 C4 70 28 30 70 28 C112 30 136 70 122 120 C100 134 40 134 18 120 Z" fill="${c}" stroke="#222" stroke-width="4" stroke-linejoin="round"/>
<path d="M30 112 C24 96 40 118 70 120 C96 122 112 112 114 104 C110 120 90 128 70 128 C50 128 34 122 30 112Z" fill="${d}" opacity=".35"/>
<ellipse cx="40" cy="48" rx="15" ry="7" fill="#fff" opacity=".4" transform="rotate(-35 40 48)"/>
<ellipse cx="12" cy="92" rx="11" ry="7" fill="${c}" stroke="#222" stroke-width="3" transform="rotate(-30 12 92)"/><ellipse cx="128" cy="92" rx="11" ry="7" fill="${c}" stroke="#222" stroke-width="3" transform="rotate(30 128 92)"/>
${eyeSVG}${brows}
<path d="M38 93 Q70 130 102 93 Z" fill="#3b0a1a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>${teeth}
<ellipse cx="70" cy="113" rx="13" ry="6" fill="#ff7b9c"/>`;
}

// Coconut palm tree. viewBox 0 0 70 100, base at (35, 98).
export function palmSVG() {
  const frond = (a, flip, fill) =>
    `<g transform="translate(35 32) scale(${flip ? -1 : 1} 1) rotate(${a})"><path d="M0 0 C8 -13 27 -17 46 -5 C31 -8 14 -3 0 0Z" fill="${fill}" stroke="#1d6b2e" stroke-width="1.6" stroke-linejoin="round"/><path d="M2 -1 C16 -8 30 -9 42 -5" stroke="#1d6b2e" stroke-width="1.2" fill="none" opacity=".7"/></g>`;
  const right = [-75, -40, -5, 32].map((a, i) => frond(a, false, i % 2 ? '#3fb55a' : '#2e9e45')).join('');
  const left = [-75, -40, -5, 32].map((a, i) => frond(a, true, i % 2 ? '#2e9e45' : '#3fb55a')).join('');
  const rings = [90, 80, 70, 60, 50, 41].map((y) => `<path d="M${31 - (98 - y) * 0.02} ${y} Q35 ${y + 3} ${39 + (98 - y) * 0.01} ${y}" stroke="#6d3d14" stroke-width="1.6" fill="none" opacity=".5"/>`).join('');
  return `
<path d="M30 98 C28 76 33 56 31 32 L39 32 C41 56 36 76 41 98 Z" fill="#b5713a" stroke="#6d3d14" stroke-width="2" stroke-linejoin="round"/>${rings}
${left}${right}
<circle cx="31" cy="36" r="4.2" fill="#7b4a1e" stroke="#4a2a0e" stroke-width="1.4"/><circle cx="39" cy="37" r="4.2" fill="#7b4a1e" stroke="#4a2a0e" stroke-width="1.4"/><circle cx="35" cy="41" r="4.2" fill="#8a5624" stroke="#4a2a0e" stroke-width="1.4"/>
<circle cx="30" cy="34.8" r="1.2" fill="#fff" opacity=".6"/><circle cx="38" cy="35.8" r="1.2" fill="#fff" opacity=".6"/>`;
}
