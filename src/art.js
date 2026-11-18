// Original SVG artwork as plain strings, shared by the app and the icon generator.
// Cupcake Hero: gold "C" chain, cool shades, red cape. viewBox 0 0 160 180.

const BITES = [
  [131, 98, 17], [29, 100, 17], [116, 152, 19], [46, 150, 19], [80, 38, 18], [80, 116, 36],
];

export const MAX_BITES = BITES.length;

export function cupcakeSVG({ bites = 0, mood = 'cool', id = 'cc' } = {}) {
  const cuts = BITES.slice(0, bites).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#000"/>`).join('');
  const mouth =
    mood === 'hit'
      ? '<ellipse cx="80" cy="101" rx="7" ry="8" fill="#6b1d1d"/>'
      : mood === 'win'
        ? '<path d="M63 96 Q80 116 97 96 Z" fill="#6b1d1d"/><path d="M69 101 Q80 109 91 101" fill="#ff8fab"/>'
        : '<path d="M67 99 Q80 109 95 97" stroke="#6b1d1d" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  const sprinkles = [
    [52, 62, -30, '#4cc9f0'], [106, 64, 25, '#ffd60a'], [70, 50, 10, '#7ae582'], [92, 52, -20, '#9b5de5'],
    [38, 96, 40, '#ffd60a'], [124, 98, -40, '#4cc9f0'], [60, 88, 15, '#ff595e'], [104, 86, -15, '#7ae582'],
  ]
    .map(([x, y, r, c]) => `<rect x="${x - 5}" y="${y - 2}" width="10" height="4" rx="2" fill="${c}" transform="rotate(${r} ${x} ${y})"/>`)
    .join('');
  const stripes = [46, 62, 80, 98, 114].map((x, i) => `<path d="M${x - 6 + i * 2.4} 108 L${52 + i * 14} 168" stroke="#f2a93b" stroke-width="3"/>`).join('');
  return `
<defs>
  <mask id="${id}m" maskUnits="userSpaceOnUse" x="0" y="0" width="160" height="180"><rect width="160" height="180" fill="#fff"/>${cuts}</mask>
  <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a4a"/><stop offset="1" stop-color="#0d0d16"/></linearGradient>
</defs>
<g class="cape">
  <path d="M58 88 C18 96 6 140 4 172 C30 162 50 174 72 168 L92 168 C112 174 134 162 156 172 C154 140 142 96 102 88 Z" fill="#e63946" stroke="#9d0208" stroke-width="3" stroke-linejoin="round"/>
  <path d="M40 110 C32 130 28 150 26 164 M120 110 C128 130 132 150 134 164 M80 120 L80 166" stroke="#b5121d" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>
</g>
<g mask="url(#${id}m)">
  <path d="M34 106 L126 106 L112 168 Q80 176 48 168 Z" fill="#ffd166" stroke="#e09f1f" stroke-width="3" stroke-linejoin="round"/>
  ${stripes}
  <ellipse cx="80" cy="102" rx="54" ry="21" fill="#ff8fb8" stroke="#e5558a" stroke-width="3"/>
  <ellipse cx="80" cy="80" rx="42" ry="20" fill="#ffa3c6" stroke="#e5558a" stroke-width="3"/>
  <ellipse cx="80" cy="60" rx="30" ry="16" fill="#ffb8d3" stroke="#e5558a" stroke-width="3"/>
  <path d="M68 48 Q80 28 92 48 Q80 54 68 48 Z" fill="#ffc9dd" stroke="#e5558a" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="80" cy="38" r="9" fill="#e63946" stroke="#9d0208" stroke-width="2.5"/><circle cx="76.5" cy="34.5" r="2.6" fill="#fff" opacity=".85"/>
  ${sprinkles}
  <circle cx="55" cy="100" r="5.5" fill="#ff5d8f" opacity=".55"/><circle cx="105" cy="100" r="5.5" fill="#ff5d8f" opacity=".55"/>
  <g class="shades">
    <rect x="46" y="71" width="29" height="18" rx="7" fill="url(#${id}l)" stroke="#111" stroke-width="3"/>
    <rect x="85" y="71" width="29" height="18" rx="7" fill="url(#${id}l)" stroke="#111" stroke-width="3"/>
    <path d="M75 77 Q80 73 85 77" stroke="#111" stroke-width="3.5" fill="none"/>
    <path d="M46 76 L38 72 M114 76 L122 72" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M52 75 L59 75 M91 75 L98 75" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
  </g>
  ${mouth}
  <path d="M30 108 Q80 144 130 108" stroke="#a8730a" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M30 108 Q80 144 130 108" stroke="#ffcf33" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="9 3"/>
  <circle cx="80" cy="126" r="13.5" fill="#ffcf33" stroke="#a8730a" stroke-width="3"/>
  <path d="M86.4 120.2 A8 8 0 1 0 86.4 131.8" stroke="#8a5a00" stroke-width="4.2" fill="none" stroke-linecap="round"/>
  <circle cx="45" cy="92" r="5.5" fill="#ffcf33" stroke="#a8730a" stroke-width="2"/><circle cx="115" cy="92" r="5.5" fill="#ffcf33" stroke="#a8730a" stroke-width="2"/>
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
<ellipse cx="12" cy="92" rx="11" ry="7" fill="${c}" stroke="#222" stroke-width="3" transform="rotate(-30 12 92)"/><ellipse cx="128" cy="92" rx="11" ry="7" fill="${c}" stroke="#222" stroke-width="3" transform="rotate(30 128 92)"/>
${eyeSVG}${brows}
<path d="M38 93 Q70 130 102 93 Z" fill="#3b0a1a" stroke="#222" stroke-width="3" stroke-linejoin="round"/>${teeth}
<ellipse cx="70" cy="113" rx="13" ry="6" fill="#ff7b9c"/>`;
}
