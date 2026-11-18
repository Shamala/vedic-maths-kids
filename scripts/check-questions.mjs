// Independently verifies every generated question (run: node scripts/check-questions.mjs)
import { WORLDS, buildLevel } from '../src/content.js';

const fail = [];
const num = (s) => Number(s);
const expected = (id, text, q) => {
  let m;
  const ev = (s) => Function(`return (${s.replace(/×/g, '*').replace(/−/g, '-').replace(/÷/g, '/')})`)();
  if ((m = text.match(/^(\d+) \+ \? = (\d+)$/))) return num(m[2]) - num(m[1]);
  if ((m = text.match(/^Half of (\d+) = \?$/))) return num(m[1]) / 2;
  if ((m = text.match(/^(\d+)% of (\d+) = \?$/))) return (num(m[1]) * num(m[2])) / 100;
  if ((m = text.match(/^Digit sum of (\d+) = \?$/))) { let n = num(m[1]); while (n > 9) n = String(n).split('').reduce((s, d) => s + +d, 0); return n; }
  if ((m = text.match(/^How many 9s in (\d+)\?$/))) return Math.floor(num(m[1]) / 9);
  if ((m = text.match(/^(\d+) ÷ 9, left over = \?$/))) return num(m[1]) % 9;
  if ((m = text.match(/^√(\d+) = \?$/))) return Math.sqrt(num(m[1]));
  if ((m = text.match(/^Which number is in the (\d+) table\?$/))) {
    const d = num(m[1]);
    const good = q.options.filter((o) => o % d === 0);
    return good.length === 1 ? good[0] : NaN;
  }
  return ev(text.replace(/ = \?$/, ''));
};

let n = 0;
for (let r = 0; r < 200; r++) {
  for (const w of WORLDS) {
    const qs = buildLevel(w);
    if (qs.length !== 10) fail.push(`${w.id}: got ${qs.length} questions`);
    if (new Set(qs.map((q) => `${q.text}|${q.ans}`)).size < 9) fail.push(`${w.id}: too many repeated questions`);
    for (const q of qs) {
      n++;
      const exp = expected(w.id, q.text, q);
      if (exp !== q.ans) fail.push(`${w.id}: "${q.text}" ans ${q.ans}, expected ${exp}`);
      if (new Set(q.options).size !== 4 || !q.options.includes(q.ans) || q.options.some((o) => o < 0 || !Number.isInteger(o))) fail.push(`${w.id}: bad options for "${q.text}" ${q.options}`);
      const bolds = [...q.hint.matchAll(/\*\*(\d+)\*\*/g)].map((b) => Number(b[1]));
      if (!bolds.includes(q.ans)) fail.push(`${w.id}: hint doesn't show the answer: "${q.text}" -> ${q.hint}`);
    }
  }
}
console.log(`${WORLDS.length} worlds, ${n} questions checked, ${fail.length} problems`);
[...new Set(fail)].slice(0, 15).forEach((f) => console.log(' -', f));
process.exit(fail.length ? 1 : 0);
