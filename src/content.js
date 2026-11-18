// Worlds, lessons and question generators for the six Vedic tricks.
import { ROUND, q, rnd, shuffle, unique } from './helpers.js';
import { MORE } from './more.js';

export { rnd, shuffle };

const CORE = [
  {
    id: 'friends',
    name: 'Ten Friends Island',
    emoji: '🤝',
    color: '#ff9f1c',
    technique: 'Friends of 10',
    blurb: 'Find the number that makes 10',
    parentTip: 'Ask at random moments: "What is the friend of 6?" until the answer is instant. Fingers help at first!',
    lesson: [
      { say: "Hi, I'm **Vinu**! Some numbers are best friends. Together they make **10**!", boards: [{ type: 'dots', n: 7 }, { type: 'eq', lines: [['a:7', '+', 'b:3', '=', 'c:10']] }] },
      { say: 'Count the empty boxes to find the friend. **7** has **3** empty boxes, so **3** is its friend!', boards: [{ type: 'dots', n: 7 }] },
      { say: "What about **4**? Its friend is **6**, because 4 + 6 = 10.", boards: [{ type: 'dots', n: 4 }, { type: 'eq', lines: [['a:4', '+', 'b:6', '=', 'c:10']] }] },
      { say: 'Big numbers have friends too, and the friend **stays the same**!', boards: [{ type: 'eq', lines: [['a:7', '+', 'b:3', '=', 'c:10'], ['a:17', '+', 'b:3', '=', 'c:20'], ['a:27', '+', 'b:3', '=', 'c:30']] }] },
    ],
    make: () =>
      unique((i) => {
        if (i < 3) {
          const a = rnd(1, 9);
          return q(`${a} + ? = 10`, 10 - a, [11 - a, 9 - a, a, 12 - a], `The friend of **${a}** is **${10 - a}**, because ${a} + ${10 - a} = 10.`);
        }
        if (i < 5) {
          const t = rnd(1, 8) * 10;
          const u = rnd(1, 9);
          return q(`${t + u} + ? = ${t + 10}`, 10 - u, [11 - u, 9 - u, u], `Look at the last digit **${u}**. Its friend is **${10 - u}**!`);
        }
        const a = rnd(1, 9);
        return q(`10 − ${a} = ?`, 10 - a, [11 - a, 9 - a, a], `Think: what is the friend of **${a}**? It is **${10 - a}**!`);
      }),
  },
  {
    id: 'subtract',
    name: 'Cut-Down Cove',
    emoji: '✂️',
    color: '#2ec4b6',
    technique: 'All from 9, the last from 10',
    blurb: 'Take away from 100 super fast',
    parentTip: 'Try quick ones in the car: "100 minus 24?" Say: "9 minus 2, then 10 minus 4".',
    lesson: [
      { say: 'Taking away from **100** is super quick with the Vedic trick: **all from 9, the last from 10**!', boards: [{ type: 'eq', lines: [['100', '−', '37', '=', '?']] }] },
      { say: 'Look at **37**. Take the first digit from **9**: 9 − 3 = **6**.', boards: [{ type: 'eq', lines: [['9', '−', 'a:3', '=', 'b:6']] }] },
      { say: 'Now take the last digit from **10**: 10 − 7 = **3**.', boards: [{ type: 'eq', lines: [['10', '−', 'a:7', '=', 'b:3']] }] },
      { say: 'Put them side by side: **6** and **3** make **63**! Check: 63 + 37 = 100 ✓', boards: [{ type: 'eq', lines: [['b:6', 'b:3', '=', 'c:63']] }] },
    ],
    make: () => {
      const two = (i) => {
        const t = rnd(1, 9);
        const u = rnd(1, 9);
        const n = t * 10 + u;
        const ans = 100 - n;
        return q(`100 − ${n} = ?`, ans, [ans + 10, ans - 10, (10 - u) * 10 + (9 - t), ans + 1], `9 − ${t} = **${9 - t}** and 10 − ${u} = **${10 - u}**. Put them together: **${ans}**!`);
      };
      const three = () => {
        const h = rnd(1, 8), t = rnd(1, 9), u = rnd(1, 9);
        const n = h * 100 + t * 10 + u;
        const ans = 1000 - n;
        return q(`1000 − ${n} = ?`, ans, [ans + 10, ans - 10, ans + 100, ans + 1], `9 − ${h} = **${9 - h}**, 9 − ${t} = **${9 - t}**, 10 − ${u} = **${10 - u}**. Together: **${ans}**!`);
      };
      return unique((i) => (i === ROUND - 1 ? three() : two(i)));
    },
  },
  {
    id: 'nines',
    name: 'Nine Nest',
    emoji: '🪺',
    color: '#ff5d8f',
    technique: 'Add 10, take back',
    blurb: 'Add 9 and 8 in a flash',
    parentTip: 'Practise "add 10, take 1 back" with everyday numbers: bus numbers, page numbers, scores.',
    lesson: [
      { say: '**9** is almost **10**. So adding 9 is like adding 10 and taking **1** back!', boards: [{ type: 'eq', lines: [['6', '+', '9', '=', '?']] }] },
      { say: 'First add 10: 6 + 10 = **16**.', boards: [{ type: 'eq', lines: [['6', '+', 'a:10', '=', 'b:16']] }] },
      { say: 'Now take 1 back: 16 − 1 = **15**. So 6 + 9 = 15!', boards: [{ type: 'eq', lines: [['b:16', '−', 'a:1', '=', 'c:15']] }] },
      { say: 'For **8**, add 10 and take **2** back!', boards: [{ type: 'eq', lines: [['5', '+', '8'], ['5', '+', '10', '=', 'b:15'], ['b:15', '−', 'a:2', '=', 'c:13']] }] },
    ],
    make: () =>
      unique((i) => {
        if (i < 2) {
          const a = rnd(3, 9);
          return q(`${a} + 9 = ?`, a + 9, [a + 10, a + 8, a + 11], `${a} + 10 = ${a + 10}, then take 1 back: **${a + 9}**!`);
        }
        if (i < 4) {
          const a = rnd(12, 66);
          return q(`${a} + 9 = ?`, a + 9, [a + 10, a + 8, a + 19], `${a} + 10 = ${a + 10}, then take 1 back: **${a + 9}**!`);
        }
        const a = rnd(5, 45);
        return q(`${a} + 8 = ?`, a + 8, [a + 10, a + 7, a + 9], `${a} + 10 = ${a + 10}, then take 2 back: **${a + 8}**!`);
      }),
  },
  {
    id: 'tables',
    name: 'Rocket Table Rise',
    emoji: '🚀',
    color: '#6c4cf1',
    technique: 'Nikhilam: tables 7, 8, 9',
    blurb: 'Multiply 7, 8 and 9 by crosswise magic',
    parentTip: 'Ask: "How far is 8 from 10?" and "How far is 7?" The tricks come from knowing the gaps.',
    lesson: [
      { say: "Let's make the **7, 8 and 9 tables** easy! Meet **7 × 8**.", boards: [{ type: 'eq', lines: [['7', '×', '8', '=', '?']] }] },
      { say: 'How far is each number from **10**? 7 is **3** away. 8 is **2** away.', boards: [{ type: 'eq', lines: [['7', '→', 'a:3 away'], ['8', '→', 'a:2 away']] }] },
      { say: 'Take **crosswise**: 7 − 2 = **5**. This is the tens digit!', boards: [{ type: 'eq', lines: [['7', '−', 'a:2', '=', 'b:5']] }] },
      { say: 'Multiply the gaps: 3 × 2 = **6**. This is the ones digit!', boards: [{ type: 'eq', lines: [['a:3', '×', 'a:2', '=', 'c:6']] }] },
      { say: 'Put them together: **5** and **6** make **56**! 7 × 8 = 56 🎉', boards: [{ type: 'eq', lines: [['b:5', 'c:6', '=', '56']] }] },
    ],
    make: () => {
      const pairs = [[7, 7], [7, 8], [7, 9], [8, 8], [8, 9], [9, 9]];
      return shuffle(pairs).map(([x, y]) => {
        const [a, b] = rnd(0, 1) ? [x, y] : [y, x];
        const da = 10 - a, db = 10 - b;
        const left = a - db, right = da * db;
        const ans = a * b;
        return q(`${a} × ${b} = ?`, ans, [ans + 10, ans - 10, ans + 1, ans - 1, left * 10 + da + db], `${a} is **${da}** away from 10, ${b} is **${db}** away. ${a} − ${db} = **${left}**, and ${da} × ${db} = **${right}**. Together: **${ans}**!`);
      });
    },
  },
  {
    id: 'eleven',
    name: 'Eleven Echo Canyon',
    emoji: '🏞️',
    color: '#43c463',
    technique: 'Multiply by 11',
    blurb: 'Magic middle-number trick',
    parentTip: 'Challenge: "Can you do 34 × 11 in your head?" (3, then 3+4=7, then 4 → 374).',
    lesson: [
      { say: 'Multiplying by **11** is a magic show! Try **23 × 11**.', boards: [{ type: 'eq', lines: [['23', '×', '11', '=', '?']] }] },
      { say: 'Split the digits and leave a gap: **2 _ 3**.', boards: [{ type: 'eq', lines: [['a:2', '_', 'a:3']] }] },
      { say: 'Add the two digits: 2 + 3 = **5**. Pop it in the middle!', boards: [{ type: 'eq', lines: [['a:2', 'b:5', 'a:3', '=', 'c:253']] }] },
      { say: 'Same digit twice? Easy! **4 × 11 = 44** and **7 × 11 = 77**.', boards: [{ type: 'eq', lines: [['4', '×', '11', '=', 'c:44'], ['7', '×', '11', '=', 'c:77']] }] },
    ],
    make: () => {
      const singles = shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2);
      const doubles = [];
      const seen = new Set();
      while (doubles.length < 4) {
        const a = rnd(1, 8), b = rnd(1, 9 - a);
        if (!seen.has(a * 10 + b)) { seen.add(a * 10 + b); doubles.push([a, b]); }
      }
      return [
        ...singles.map((d) => q(`${d} × 11 = ?`, d * 11, [d * 11 + 11, d * 11 - 11, d * 11 + 1], `Write the digit twice: **${d}${d}**!`)),
        ...doubles.map(([a, b]) => {
          const ans = (a * 10 + b) * 11;
          return q(`${a}${b} × 11 = ?`, ans, [ans + 10, ans - 10, ans + 1, ans - 1], `${a} _ ${b}. Add ${a} + ${b} = **${a + b}**. Put it in the middle: **${ans}**!`);
        }),
      ];
    },
  },
  {
    id: 'five',
    name: 'Five Fort',
    emoji: '🏰',
    color: '#ff6b3d',
    technique: 'Squares of numbers ending in 5',
    blurb: 'Super-speed 15 × 15, 35 × 35...',
    parentTip: 'Pick any number ending in 5 and say the rule together: "tens digit times the next number, then 25".',
    lesson: [
      { say: 'Numbers ending in **5** have a super trick! Try **35 × 35**.', boards: [{ type: 'eq', lines: [['35', '×', '35', '=', '?']] }] },
      { say: 'Look at the tens digit: **3**. The next number is **4**.', boards: [{ type: 'eq', lines: [['a:3', '→', 'b:4']] }] },
      { say: 'Multiply them: 3 × 4 = **12**.', boards: [{ type: 'eq', lines: [['a:3', '×', 'b:4', '=', 'c:12']] }] },
      { say: 'Now write **25** at the end: **12** then **25**. So 35 × 35 = **1225**! 🏰', boards: [{ type: 'eq', lines: [['c:12', 'a:25', '=', '1225']] }] },
    ],
    make: () =>
      shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .slice(0, ROUND)
        .sort((x, y) => x - y)
        .map((t) => {
          const m = t * (t + 1);
          const ans = m * 100 + 25;
          return q(`${t}5 × ${t}5 = ?`, ans, [ans + 100, ans - 100, t * t * 100 + 25, ans + 10, m * 100 + 52], `${t} × ${t + 1} = **${m}**. Then write **25** after it: **${ans}**!`);
        }),
  },
];

const ORDER = [
  'friends', 'nines', 'splitadd', 'roundfix', 'subtract', 'double',
  'tables', 'eleven', 'highfive', 'quarter', 'ninesmult', 'percent', 'digitsum', 'detective', 'div9',
  'five', 'fifty', 'hundred', 'nikhilam100', 'elevencarry', 'crosswise', 'duplex', 'sqrt',
];
export const REALMS = [
  { id: 1, name: 'Little Explorers', age: 'ages 6–8', emoji: '🌱', count: 6 },
  { id: 2, name: 'Trick Trekkers', age: 'ages 8–10', emoji: '🧭', count: 9 },
  { id: 3, name: 'Maths Maharajas', age: 'ages 10–12', emoji: '👑', count: 8 },
];
const all = Object.fromEntries([...CORE, ...MORE].map((w) => [w.id, w]));
let at = 0;
export const WORLDS = REALMS.flatMap((r) =>
  ORDER.slice(at, (at += r.count)).map((id) => ({ ...all[id], realm: r.id }))
);

export const LEVELS = ['Number Newbie', 'Counting Cub', 'Maths Mouse', 'Trick Tiger', 'Vedic Voyager', 'Speed Star', 'Number Ninja', 'Quick-Fire Guru', 'Ganit Genius', 'Vedic Veteran', 'Maths Maharaja', 'Grand Maharaja'];
export const levelOf = (xp) => {
  const lvl = Math.floor(xp / 100);
  return { n: lvl + 1, title: LEVELS[Math.min(lvl, LEVELS.length - 1)], pct: xp % 100 };
};
export const AVATARS = ['🦊', '🐼', '🦁', '🐯', '🐸', '🐵', '🦄', '🐙'];
