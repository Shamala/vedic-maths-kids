export const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const ROUND = 6;
export const pad2 = (n) => String(n).padStart(2, '0');

export function options(ans, traps) {
  const s = new Set([ans]);
  for (const c of traps) {
    if (s.size >= 4) break;
    if (Number.isInteger(c) && c >= 0) s.add(c);
  }
  for (let d = 1; s.size < 4; d++) {
    const c = ans + (rnd(0, 1) ? d : -d);
    if (c >= 0) s.add(c);
  }
  return shuffle([...s]);
}

export const q = (text, ans, traps, hint) => ({ text, ans, options: options(ans, traps), hint });

// Draw n questions with unique text from a generator
export function unique(gen, n = ROUND) {
  const seen = new Set();
  const out = [];
  let guard = 0;
  while (out.length < n && guard++ < 300) {
    const item = gen(out.length);
    if (!seen.has(item.text)) {
      seen.add(item.text);
      out.push(item);
    }
  }
  return out;
}
