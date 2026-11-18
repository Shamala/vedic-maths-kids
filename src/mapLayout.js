// Treasure-island map layout: islands scattered across the sea, level circles sit on them,
// and one winding dotted path links every level in order.
import { REALMS, WORLDS } from './content.js';

export const W = 400;
const SIZES = { 1: [3, 3], 2: [3, 3, 3], 3: [3, 3, 2] }; // levels per island, per realm
const CX = [148, 254, 140, 258, 150, 250, 138, 252]; // island centres alternate left / right
const NODE_DX = [-46, 44, -32];
const STEP = 112;
const PAD = 86;
const GAP = 64;
const TOP = 170;
const R = (n) => Math.round(n * 10) / 10;

function smooth(p, closed) {
  const n = p.length;
  const get = (i) => (closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${R(p[0][0])} ${R(p[0][1])}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const [p0, p1, p2, p3] = [get(i - 1), get(i), get(i + 1), get(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${R(c1[0])} ${R(c1[1])} ${R(c2[0])} ${R(c2[1])} ${R(p2[0])} ${R(p2[1])}`;
  }
  return closed ? d + 'Z' : d;
}

function blob(cx, cy, rx, ry, k) {
  const pts = [];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const r = 0.84 + 0.16 * Math.abs(Math.sin(k * 7.3 + i * 2.1));
    pts.push([cx + rx * r * Math.cos(a), cy + ry * r * Math.sin(a)]);
  }
  return smooth(pts, true);
}

const PALM_ANGLES = [[205, 335, 100], [150, 28, 262], [212, 328, 80], [160, 35], [200, 340, 95], [145, 30, 268], [208, 332, 85], [155, 38]];

export function buildLayout() {
  const islands = [];
  const nodes = [];
  const signs = [];
  let y = TOP;
  let k = 0;
  let wi = 0;
  for (const realm of REALMS) {
    SIZES[realm.id].forEach((n, ri) => {
      if (ri === 0) {
        y += 40;
        signs.push({ realm, x: CX[k], y: y - 8 });
        y += 26;
      }
      const h = (n - 1) * STEP + PAD * 2;
      const cx = CX[k];
      const cy = y + h / 2;
      const rx = 120;
      const ry = h / 2;
      const dir = k % 2 ? -1 : 1;
      for (let j = 0; j < n; j++) nodes.push({ i: wi++, x: cx + dir * NODE_DX[j], y: y + PAD + j * STEP });
      const palms = PALM_ANGLES[k % PALM_ANGLES.length].map((deg, pi) => {
        const a = (deg * Math.PI) / 180;
        return { x: R(cx + rx * 0.72 * Math.cos(a)), y: R(cy + ry * 0.8 * Math.sin(a)), s: 0.78 + ((k + pi) % 3) * 0.12, flip: (k + pi) % 2 === 1, delay: -((k * 3 + pi) % 5) * 0.8 };
      });
      islands.push({ k, cx, cy, rx, ry, d: blob(cx, cy, rx, ry, k), palms });
      y += h + GAP;
      k++;
    });
  }
  const last = nodes[nodes.length - 1];
  const treasure = { x: last.x + (k % 2 ? 40 : -40), y: last.y + 58 };
  const start = { x: 96, y: 112 };
  const H = Math.round(y + 120);
  const pathD = smooth([[start.x, start.y], ...nodes.map((n) => [n.x, n.y]), [treasure.x, treasure.y]], false);
  if (nodes.length !== WORLDS.length) throw new Error(`map has ${nodes.length} nodes for ${WORLDS.length} levels`);
  return { H, islands, nodes, signs, start, treasure, pathD };
}

export const LAYOUT = buildLayout();
