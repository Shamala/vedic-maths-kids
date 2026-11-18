// Additional Vedic-maths islands (realms 1-3). Every generator is verified by scripts/check-questions.mjs
import { pad2, q, rnd, shuffle, unique } from './helpers.js';

const dsum = (n) => String(n).split('').reduce((s, d) => s + Number(d), 0);
const root = (n) => {
  while (n > 9) n = dsum(n);
  return n;
};
const take3 = (arr) => shuffle(arr).slice(0, 3);

export const MORE = [
  // ───────────── Realm 1: Little Explorers ─────────────
  {
    id: 'splitadd',
    name: 'Puzzle Peak',
    emoji: '🧩',
    color: '#00b4d8',
    technique: 'Add from the left',
    blurb: 'Split tens and ones, then join',
    parentTip: 'Say it aloud: "tens first, then ones". Try it with prices or ages.',
    lesson: [
      { say: 'Add big numbers from the **left**, like reading! Try **47 + 38**.', boards: [{ type: 'eq', lines: [['47', '+', '38', '=', '?']] }] },
      { say: 'Add the **tens** first: 40 + 30 = **70**.', boards: [{ type: 'eq', lines: [['a:40', '+', 'a:30', '=', 'b:70']] }] },
      { say: 'Now add the **ones**: 7 + 8 = **15**.', boards: [{ type: 'eq', lines: [['a:7', '+', 'a:8', '=', 'b:15']] }] },
      { say: 'Join them: 70 + 15 = **85**!', boards: [{ type: 'eq', lines: [['b:70', '+', 'b:15', '=', 'c:85']] }] },
    ],
    make: () =>
      unique((i) => {
        let a, b;
        do {
          a = rnd(12, 68);
          b = rnd(11, 59);
        } while (i < 2 ? (a % 10) + (b % 10) >= 10 || a + b >= 100 : (a % 10) + (b % 10) < 10);
        const ta = a - (a % 10), tb = b - (b % 10), ua = a % 10, ub = b % 10;
        const ans = a + b;
        return q(`${a} + ${b} = ?`, ans, [ans + 10, ans - 10, ans + 1, ta + tb + ((ua + ub) % 10)], `Tens: ${ta} + ${tb} = ${ta + tb}. Ones: ${ua} + ${ub} = ${ua + ub}. Join: **${ans}**!`);
      }),
  },
  {
    id: 'roundfix',
    name: 'Fix-It Fields',
    emoji: '🎈',
    color: '#f15bb5',
    technique: 'Round and fix',
    blurb: 'Take away 9s, 8s and 7s fast',
    parentTip: 'Use shopping: "₹100 minus ₹29?" Round to ₹30, then give ₹1 back.',
    lesson: [
      { say: 'Taking away **29**? It is almost **30**! Try **83 − 29**.', boards: [{ type: 'eq', lines: [['83', '−', '29', '=', '?']] }] },
      { say: 'Take away **30** instead: 83 − 30 = **53**.', boards: [{ type: 'eq', lines: [['83', '−', 'a:30', '=', 'b:53']] }] },
      { say: 'Oops, we took **1 too many**. Give it back: 53 + 1 = **54**!', boards: [{ type: 'eq', lines: [['b:53', '+', 'a:1', '=', 'c:54']] }] },
      { say: 'For **28**, take 30 and give back **2**: 83 − 28 → 53 + 2 = **55**.', boards: [{ type: 'eq', lines: [['83', '−', '28'], ['83', '−', '30', '=', 'b:53'], ['b:53', '+', 'a:2', '=', 'c:55']] }] },
    ],
    make: () =>
      unique((i) => {
        const k = i < 3 ? 1 : i < 5 ? 2 : 3;
        const r = rnd(3, 9) * 10;
        const b = r - k;
        const a = b + rnd(11, 40);
        const ans = a - b;
        return q(`${a} − ${b} = ?`, ans, [ans - k, ans + 10, ans - 10, ans + 1], `${b} is close to ${r}. ${a} − ${r} = ${a - r}. We took ${k} too many, so add it back: ${a - r} + ${k} = **${ans}**!`);
      }),
  },
  {
    id: 'double',
    name: 'Double Dune',
    emoji: '👯',
    color: '#8ac926',
    technique: 'Double and halve',
    blurb: '× 2, × 4, × 8 and halves',
    parentTip: 'Play "double double": start at 3 and keep doubling, how far can you go?',
    lesson: [
      { say: '**Double** means × 2. For **34 × 2**, double the tens and the ones!', boards: [{ type: 'eq', lines: [['a:30', '×', '2', '=', 'b:60'], ['a:4', '×', '2', '=', 'b:8'], ['b:60', '+', 'b:8', '=', 'c:68']] }] },
      { say: 'To multiply by **4**, double and double again! 12 × 4: 12 → **24** → **48**.', boards: [{ type: 'eq', lines: [['12', '→', 'a:24', '→', 'b:48']] }] },
      { say: 'For **8**, double three times! 5 × 8: 5 → 10 → 20 → **40**.', boards: [{ type: 'eq', lines: [['5', '→', 'a:10', '→', 'a:20', '→', 'b:40']] }] },
      { say: 'To **halve**, split the number: half of **86** is half of 80 (**40**) plus half of 6 (**3**) = **43**!', boards: [{ type: 'eq', lines: [['a:80', '÷', '2', '=', 'b:40'], ['a:6', '÷', '2', '=', 'b:3'], ['b:40', '+', 'b:3', '=', 'c:43']] }] },
    ],
    make: () => {
      const types = ['x2', 'half', 'x4', 'x4', 'x8', 'half3'];
      const seen = new Set();
      return types.map((t) => {
        for (;;) {
          let item;
          if (t === 'x2') {
            const n = rnd(13, 49), tt = n - (n % 10), u = n % 10, ans = n * 2;
            item = q(`${n} × 2 = ?`, ans, [ans + 10, ans - 10, ans + 2, ans - 2], `Double ${tt} = ${tt * 2}, double ${u} = ${u * 2}. Join: **${ans}**!`);
          } else if (t === 'x4') {
            const n = rnd(12, 35), ans = n * 4;
            item = q(`${n} × 4 = ?`, ans, [ans + 10, ans - 10, n * 2, ans + 4], `Double ${n} = ${n * 2}. Double again = **${ans}**!`);
          } else if (t === 'x8') {
            const n = rnd(6, 15), ans = n * 8;
            item = q(`${n} × 8 = ?`, ans, [ans + 10, ans - 10, n * 4, ans + 8], `${n} → ${n * 2} → ${n * 4} → **${ans}**!`);
          } else {
            const n = t === 'half' ? 2 * rnd(12, 49) : 2 * rnd(101, 249), u = n % 10, ans = n / 2;
            item = q(`Half of ${n} = ?`, ans, [ans + 10, ans - 10, ans + 5, ans + 1], `Half of ${n - u} is ${(n - u) / 2}, half of ${u} is ${u / 2}. Join: **${ans}**!`);
          }
          if (!seen.has(item.text)) {
            seen.add(item.text);
            return item;
          }
        }
      });
    },
  },

  // ───────────── Realm 2: Trick Trekkers ─────────────
  {
    id: 'highfive',
    name: 'High-Five Harbour',
    emoji: '🖐️',
    color: '#ff924c',
    technique: 'Multiply by 5',
    blurb: 'Half of × 10',
    parentTip: 'Ask "what is 5 times my age?" using the half-then-zero trick.',
    lesson: [
      { say: '× **5** is just **half** of × 10! Try **18 × 5**.', boards: [{ type: 'eq', lines: [['18', '×', '5', '=', '?']] }] },
      { say: 'Half of 18 is **9**.', boards: [{ type: 'eq', lines: [['18', '÷', '2', '=', 'a:9']] }] },
      { say: 'Add a zero: 9 becomes **90**. So 18 × 5 = **90**!', boards: [{ type: 'eq', lines: [['a:9', '→', 'c:90']] }] },
      { say: 'Odd number? **17 × 5**: half of 17 is 8.5. Take away the point: **85**!', boards: [{ type: 'eq', lines: [['17', '×', '5'], ['a:8.5', '→', 'c:85']] }] },
    ],
    make: () =>
      unique((i) => {
        if (i < 4) {
          const n = 2 * rnd(3, 24), ans = n * 5;
          return q(`${n} × 5 = ?`, ans, [ans + 10, ans - 10, ans + 5, n * 10], `Half of ${n} = ${n / 2}. Add a zero: **${ans}**!`);
        }
        const n = 2 * rnd(2, 24) + 1, ans = n * 5;
        return q(`${n} × 5 = ?`, ans, [ans + 10, ans - 10, ans + 5, n * 10], `Half of ${n} is ${n / 2}. Take away the point: **${ans}**!`);
      }),
  },
  {
    id: 'quarter',
    name: 'Quarter Quest',
    emoji: '🪙',
    color: '#ffb703',
    technique: 'Multiply by 25 and 50',
    blurb: 'Quarter or half, then add 00',
    parentTip: 'Link to money: 25 paise coins make a rupee. How much is 36 quarter-coins?',
    lesson: [
      { say: '**25** is a quarter of 100! So × 25 means ÷ 4, then add **00**. Try **48 × 25**.', boards: [{ type: 'eq', lines: [['48', '×', '25', '=', '?']] }] },
      { say: '48 ÷ 4 = **12**. Add 00: **1200**!', boards: [{ type: 'eq', lines: [['48', '÷', '4', '=', 'a:12'], ['a:12', '→', 'c:1200']] }] },
      { say: 'For × **50**, take **half**, then add 00. 36 × 50: half of 36 is 18 → **1800**.', boards: [{ type: 'eq', lines: [['36', '÷', '2', '=', 'a:18'], ['a:18', '→', 'c:1800']] }] },
    ],
    make: () =>
      unique((i) => {
        if (i < 4) {
          const k = rnd(3, 24), n = 4 * k, ans = n * 25;
          return q(`${n} × 25 = ?`, ans, [ans + 100, ans - 100, ans + 10, n * 10], `${n} ÷ 4 = ${k}. Add 00: **${ans}**!`);
        }
        const k = rnd(6, 49), n = 2 * k, ans = n * 50;
        return q(`${n} × 50 = ?`, ans, [ans + 100, ans - 100, ans + 10, k * 10], `Half of ${n} = ${k}. Add 00: **${ans}**!`);
      }),
  },
  {
    id: 'ninesmult',
    name: 'Nine Mountain',
    emoji: '⛰️',
    color: '#06d6a0',
    technique: 'Multiply by 9 and 99',
    blurb: '× 10 (or × 100), minus the number',
    parentTip: 'Pick any number and ask "× 9?" Say: ten times, then take one away.',
    lesson: [
      { say: '× **9** is easy: **× 10, then take the number away**. Try **23 × 9**.', boards: [{ type: 'eq', lines: [['23', '×', '9', '=', '?']] }] },
      { say: '23 × 10 = **230**. Take away 23: 230 − 23 = **207**.', boards: [{ type: 'eq', lines: [['23', '×', '10', '=', 'a:230'], ['a:230', '−', '23', '=', 'c:207']] }] },
      { say: 'For **99**, use 100! 7 × 99 = 700 − 7 = **693**.', boards: [{ type: 'eq', lines: [['7', '×', '100', '=', 'a:700'], ['a:700', '−', '7', '=', 'c:693']] }] },
    ],
    make: () =>
      unique((i) => {
        if (i < 3) {
          const n = rnd(12, 49), ans = n * 9;
          return q(`${n} × 9 = ?`, ans, [n * 10, ans + 10, ans - 10, ans + n], `${n} × 10 = ${n * 10}. Take away ${n}: ${n * 10} − ${n} = **${ans}**!`);
        }
        const n = rnd(3, 12), ans = n * 99;
        return q(`${n} × 99 = ?`, ans, [n * 100, ans + 10, ans - 10, ans + n], `${n} × 100 = ${n * 100}. Take away ${n}: **${ans}**!`);
      }),
  },
  {
    id: 'percent',
    name: 'Flip Falls',
    emoji: '🔄',
    color: '#9b5de5',
    technique: 'Flip the percent',
    blurb: '8% of 50 is 50% of 8!',
    parentTip: 'At the shops: "What is 4% of 50?" then flip it to "50% of 4".',
    lesson: [
      { say: 'Percent can **flip**! **8% of 50** is the same as **50% of 8**.', boards: [{ type: 'eq', lines: [['a:8%', 'of', 'b:50'], ['=', 'b:50%', 'of', 'a:8']] }] },
      { say: '50% is **half**. Half of 8 = **4**. So 8% of 50 = **4**!', boards: [{ type: 'eq', lines: [['b:50%', 'of', 'a:8', '=', 'c:4']] }] },
      { say: 'Handy helpers: **50%** is a half, **25%** a quarter, **20%** a fifth, **10%** a tenth.', boards: [{ type: 'eq', lines: [['50%', '=', 'a:half'], ['25%', '=', 'a:quarter'], ['20%', '=', 'a:fifth'], ['10%', '=', 'a:tenth']] }] },
    ],
    make: () => {
      const kinds = [50, 50, 25, 25, 20, 10];
      const word = { 50: 'half', 25: 'a quarter', 20: 'a fifth', 10: 'a tenth' };
      const seen = new Set();
      return kinds.map((b) => {
        for (;;) {
          const a = b === 50 ? 2 * rnd(2, 15) : b === 25 ? 4 * rnd(2, 10) : b === 20 ? 5 * rnd(2, 10) : 10 * rnd(2, 9);
          const ans = (a * b) / 100;
          const text = `${a}% of ${b} = ?`;
          if (seen.has(text)) continue;
          seen.add(text);
          return q(text, ans, [ans + 1, ans - 1, ans * 2, ans + 2], `Flip it: ${a}% of ${b} is ${b}% of ${a}. That is ${word[b]} of ${a} = **${ans}**!`);
        }
      });
    },
  },
  {
    id: 'digitsum',
    name: 'Crystal Cave',
    emoji: '🔮',
    color: '#7209b7',
    technique: 'Magic digit sum (Beejank)',
    blurb: 'Add digits until one is left',
    parentTip: 'Use digit sums to check homework answers: the digit sum of a sum must match!',
    lesson: [
      { say: 'Meet the **digit sum**: add the digits until just one is left. Try **487**.', boards: [{ type: 'eq', lines: [['4', '+', '8', '+', '7', '=', 'a:19']] }] },
      { say: '19 still has two digits. Keep going: 1 + 9 = 10, then 1 + 0 = **1**. The digit sum of 487 is **1**!', boards: [{ type: 'eq', lines: [['a:19', '→', 'b:10', '→', 'c:1']] }] },
      { say: 'Fun fact: **9 counts like zero**! Cross out digits that make 9: in **2 7 4**, 2 + 7 = 9 goes away, leaving **4**.', boards: [{ type: 'eq', lines: [['a:2', '+', 'a:7', '=', 'b:9 → 0'], ['left:', 'c:4']] }] },
    ],
    make: () =>
      unique((i) => {
        let n;
        if (i < 2) {
          const a = rnd(1, 8);
          n = a * 10 + rnd(0, 8 - a);
        } else if (i < 4) {
          const a = rnd(2, 9);
          n = a * 10 + rnd(10 - a, 9);
        } else n = rnd(100, 999);
        const ans = root(n);
        const digits = String(n).split('');
        let hint = `${digits.join(' + ')} = ${dsum(n)}`;
        let t = dsum(n);
        while (t > 9) {
          hint += `, then ${String(t).split('').join(' + ')} = ${dsum(t)}`;
          t = dsum(t);
        }
        const traps = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => d !== ans)).slice(0, 3);
        return q(`Digit sum of ${n} = ?`, ans, traps, `${hint}. Digit sum: **${ans}**!`);
      }),
  },
  {
    id: 'detective',
    name: 'Divisible Den',
    emoji: '🕵️',
    color: '#ef476f',
    technique: 'Divisibility detective',
    blurb: 'Spot the 3, 9 and 11 tables',
    parentTip: 'Challenge: "Is our car number plate in the 9 table?" Add its digits!',
    lesson: [
      { say: 'Is a number in the **3 table**? Add its digits! If the digit sum is in the 3 table, so is the number. **123**: 1 + 2 + 3 = **6** ✓', boards: [{ type: 'eq', lines: [['1', '+', '2', '+', '3', '=', 'a:6 ✓']] }] },
      { say: 'For the **9 table**, the digit sum must be **9** (or 18). **729**: 7 + 2 + 9 = 18 → 1 + 8 = **9** ✓', boards: [{ type: 'eq', lines: [['7', '+', '2', '+', '9', '=', 'a:18', '→', 'c:9 ✓']] }] },
      { say: 'For the **11 table**, go **alternately**: **429** → 4 − 2 + 9 = **11** ✓ (0 or 11 works!)', boards: [{ type: 'eq', lines: [['4', '−', '2', '+', '9', '=', 'a:11 ✓']] }] },
    ],
    make: () => {
      const kinds = [3, 3, 9, 9, 11, 11];
      const used = new Set();
      return kinds.map((d) => {
        for (;;) {
          let m, offs;
          if (d === 3) { m = 3 * rnd(34, 300); offs = take3([1, 2, 4, 5, 7, 8, -1, -2, -4, -5]); }
          else if (d === 9) { m = 9 * rnd(12, 110); offs = take3([1, 2, 3, 4, 5, 6, 7, 8]); }
          else { m = 11 * rnd(10, 90); offs = take3([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); }
          if (used.has(m)) continue;
          used.add(m);
          const ds = String(m).split('').map(Number);
          let hint;
          if (d === 11) {
            const alt = ds.reduce((s, x, k) => s + (k % 2 === 0 ? x : -x), 0);
            hint = `${m}: ${ds.map((x, k) => (k ? (k % 2 ? '− ' : '+ ') : '') + x).join(' ')} = ${alt}, which is in the 11 table: **${m}**!`;
          } else {
            hint = `Digit sum of ${m}: ${ds.join(' + ')} = ${dsum(m)}${dsum(m) > 9 ? ` → ${root(m)}` : ''}, which is in the ${d} table: **${m}**!`;
          }
          return q(`Which number is in the ${d} table?`, m, offs.map((o) => m + o), hint);
        }
      });
    },
  },
  {
    id: 'div9',
    name: 'Share-by-9 Shore',
    emoji: '🏖️',
    color: '#118ab2',
    technique: 'Divide by 9',
    blurb: 'Quotient and remainder, no long division',
    parentTip: 'Try it on small numbers: 43 ÷ 9 → 4 and 4 + 3 = 7 left over.',
    lesson: [
      { say: 'Dividing by **9** has a magic trick! **52 ÷ 9**: the first digit **5** is the quotient.', boards: [{ type: 'eq', lines: [['a:5', '2', '÷', '9']] }] },
      { say: 'Add the digits: 5 + 2 = **7**. That is the remainder! So 52 ÷ 9 = 5 remainder 7 ✓', boards: [{ type: 'eq', lines: [['a:5', '+', 'a:2', '=', 'b:7']] }] },
      { say: 'Three digits? **134 ÷ 9**: quotient starts **1**, then 1 + 3 = **4** → **14**. Remainder: 1 + 3 + 4 = **8**.', boards: [{ type: 'eq', lines: [['a:1', 'b:4', '=', 'quotient'], ['a:1', '+', 'a:3', '+', 'a:4', '=', 'c:8']] }] },
    ],
    make: () => {
      const kinds = ['q2', 'q3', 'q3', 'q3', 'r2', 'r3'];
      const used = new Set();
      return kinds.map((k) => {
        for (;;) {
          const three = k.endsWith('3');
          let a, b, c = 0, n;
          if (three) {
            a = rnd(1, 6); b = rnd(0, 7 - a); c = rnd(0, 8 - a - b);
            n = a * 100 + b * 10 + c;
          } else {
            a = rnd(1, 7); b = rnd(0, 8 - a);
            n = a * 10 + b;
          }
          if (used.has(n)) continue;
          used.add(n);
          const quo = Math.floor(n / 9), rem = n % 9;
          if (k[0] === 'q') {
            return q(`How many 9s in ${n}?`, quo, [quo + 1, quo - 1, quo + 10, rem], three ? `Quotient: ${a}, then ${a} + ${b} = ${a + b} → **${quo}**!` : `The first digit ${a} is the quotient: **${quo}**!`);
          }
          return q(`${n} ÷ 9, left over = ?`, rem, [rem + 1, rem - 1, quo % 10, rem + 2], three ? `Add the digits: ${a} + ${b} + ${c} = **${rem}**!` : `Add the digits: ${a} + ${b} = **${rem}**!`);
        }
      });
    },
  },

  // ───────────── Realm 3: Maths Maharajas ─────────────
  {
    id: 'fifty',
    name: 'Fifty Fjord',
    emoji: '🌗',
    color: '#3a86ff',
    technique: 'Squares near 50',
    blurb: '52 × 52, 48 × 48 in a flash',
    parentTip: 'Show how 25 ± the gap makes the front, and gap² the back (two digits).',
    lesson: [
      { say: 'Numbers near **50** are easy to square! **52 × 52** is **2** more than 50.', boards: [{ type: 'eq', lines: [['52', '×', '52', '=', '?']] }] },
      { say: 'Front part: 25 + 2 = **27**.', boards: [{ type: 'eq', lines: [['25', '+', 'a:2', '=', 'b:27']] }] },
      { say: 'Back part: 2 × 2 = 4, written with two digits: **04**.', boards: [{ type: 'eq', lines: [['a:2', '×', 'a:2', '=', 'c:04']] }] },
      { say: 'Together: **27** and **04** → **2704**! Below 50, take away instead: 48² → 25 − 2 = 23 → **2304**.', boards: [{ type: 'eq', lines: [['b:27', 'c:04', '=', '2704'], ['b:23', 'c:04', '=', '2304']] }] },
    ],
    make: () => {
      const xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      return xs.slice(0, 6).map((x, i) => {
        const up = i < 3;
        const n = up ? 50 + x : 50 - x;
        const ans = n * n;
        const front = up ? 25 + x : 25 - x;
        return q(`${n} × ${n} = ?`, ans, [ans + 100, ans - 100, front * 10 + x * x, ans + 10], `${n} is ${x} ${up ? 'more' : 'less'} than 50. 25 ${up ? '+' : '−'} ${x} = ${front}, and ${x}² = ${pad2(x * x)}. Together: **${ans}**!`);
      });
    },
  },
  {
    id: 'hundred',
    name: 'Hundred Hills',
    emoji: '💯',
    color: '#e63946',
    technique: 'Squares near 100',
    blurb: '97 × 97, 103 × 103',
    parentTip: 'Say: "gap from 100, subtract it from the number, then square the gap".',
    lesson: [
      { say: 'Squaring near **100**! **97 × 97**: it is **3** below 100.', boards: [{ type: 'eq', lines: [['97', '×', '97', '=', '?']] }] },
      { say: 'Front: take 3 from 97 = **94**.', boards: [{ type: 'eq', lines: [['97', '−', 'a:3', '=', 'b:94']] }] },
      { say: 'Back: 3 × 3 = **09** (two digits).', boards: [{ type: 'eq', lines: [['a:3', '×', 'a:3', '=', 'c:09']] }] },
      { say: 'Together: **94** and **09** → **9409**! Above 100, add: 103² → 106 | 09 → **10609**.', boards: [{ type: 'eq', lines: [['b:94', 'c:09', '=', '9409'], ['b:106', 'c:09', '=', '10609']] }] },
    ],
    make: () => {
      const xs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6);
      return xs.map((x, i) => {
        const down = i < 4;
        const n = down ? 100 - x : 100 + x;
        const ans = n * n;
        const front = down ? n - x : n + x;
        return q(`${n} × ${n} = ?`, ans, [ans + 100, ans - 100, front * 10 + x * x, ans + 10], `${n} is ${x} ${down ? 'below' : 'above'} 100. ${n} ${down ? '−' : '+'} ${x} = ${front}, and ${x}² = ${pad2(x * x)}. Together: **${ans}**!`);
      });
    },
  },
  {
    id: 'nikhilam100',
    name: 'Century Summit',
    emoji: '🏔️',
    color: '#2a9d8f',
    technique: 'Nikhilam near 100',
    blurb: '97 × 94 and friends',
    parentTip: 'Remember the three moves: gaps, crosswise subtract, multiply gaps.',
    lesson: [
      { say: 'Nikhilam works for **100** too! Try **97 × 94**.', boards: [{ type: 'eq', lines: [['97', '×', '94', '=', '?']] }] },
      { say: 'Gaps from 100: 97 is **3** away, 94 is **6** away.', boards: [{ type: 'eq', lines: [['97', '→', 'a:3'], ['94', '→', 'a:6']] }] },
      { say: 'Crosswise: 97 − 6 = **91**. That is the front part.', boards: [{ type: 'eq', lines: [['97', '−', 'a:6', '=', 'b:91']] }] },
      { say: 'Multiply the gaps: 3 × 6 = **18**. That is the back part (two digits).', boards: [{ type: 'eq', lines: [['a:3', '×', 'a:6', '=', 'c:18']] }] },
      { say: 'Together: **91** and **18** → **9118**!', boards: [{ type: 'eq', lines: [['b:91', 'c:18', '=', '9118']] }] },
    ],
    make: () => {
      const seen = new Set();
      const out = [];
      while (out.length < 6) {
        const da = rnd(2, 9), db = rnd(2, 9);
        const a = 100 - da, b = 100 - db;
        const key = [a, b].sort().join('x');
        if (seen.has(key)) continue;
        seen.add(key);
        const ans = a * b;
        out.push(q(`${a} × ${b} = ?`, ans, [ans + 100, ans - 100, ans + 10, (a - db) * 10 + da * db], `${a} is ${da} below 100, ${b} is ${db} below. ${a} − ${db} = ${a - db}, and ${da} × ${db} = ${pad2(da * db)}. Together: **${ans}**!`));
      }
      return out;
    },
  },
  {
    id: 'elevencarry',
    name: 'Eleven Volcano',
    emoji: '🌋',
    color: '#d00000',
    technique: 'Multiply by 11 with carry',
    blurb: '78 × 11 and bigger digits',
    parentTip: 'If the middle number has two digits, carry the first one to the left.',
    lesson: [
      { say: '×11 with big digits! **78 × 11**: split 7 _ 8, then 7 + 8 = **15**.', boards: [{ type: 'eq', lines: [['a:7', '_', 'a:8'], ['a:7', '+', 'a:8', '=', 'b:15']] }] },
      { say: '15 has two digits, so **carry the 1** to the left: 7 + 1 = **8**.', boards: [{ type: 'eq', lines: [['a:7', '+', 'b:1', '=', 'c:8']] }] },
      { say: 'Write **8**, then **5**, then **8** → **858**!', boards: [{ type: 'eq', lines: [['c:8', 'b:5', 'a:8', '=', '858']] }] },
    ],
    make: () => {
      const seen = new Set();
      const out = [];
      while (out.length < 6) {
        const a = rnd(2, 9), b = rnd(10 - a, 9);
        const n = a * 10 + b;
        if (seen.has(n)) continue;
        seen.add(n);
        const ans = n * 11;
        out.push(q(`${n} × 11 = ?`, ans, [ans + 10, ans - 10, ans + 100, ans - 100], `${a} _ ${b}. ${a} + ${b} = ${a + b}: write ${(a + b) % 10}, carry 1. ${a} + 1 = ${a + 1}. Together: **${ans}**!`));
      }
      return out;
    },
  },
  {
    id: 'crosswise',
    name: 'Crossroads Castle',
    emoji: '✖️',
    color: '#5f0f40',
    technique: 'Vertically and crosswise (Urdhva Tiryagbhyam)',
    blurb: 'Multiply any 2-digit numbers',
    parentTip: 'Draw the three steps: left × left, crosswise, right × right. Carry tens leftwards.',
    lesson: [
      { say: 'Multiply any 2-digit numbers in three steps! **21 × 23**.', boards: [{ type: 'eq', lines: [['21', '×', '23', '=', '?']] }] },
      { say: 'Step 1, left digits: 2 × 2 = **4**.', boards: [{ type: 'eq', lines: [['a:2', '×', 'a:2', '=', 'c:4']] }] },
      { say: 'Step 2, crosswise: 2 × 3 + 1 × 2 = **8**.', boards: [{ type: 'eq', lines: [['a:2', '×', 'b:3', '+', 'b:1', '×', 'a:2', '=', 'c:8']] }] },
      { say: 'Step 3, right digits: 1 × 3 = **3**.', boards: [{ type: 'eq', lines: [['a:1', '×', 'a:3', '=', 'c:3']] }] },
      { say: 'Join: **4 | 8 | 3** → **483**! If a part has two digits, carry the tens to the left.', boards: [{ type: 'eq', lines: [['c:4', 'c:8', 'c:3', '=', '483']] }] },
    ],
    make: () =>
      unique((i) => {
        let a, b, c, d, p1, p2, p3;
        do {
          if (i < 2) { a = rnd(1, 4); b = rnd(1, 4); c = rnd(1, 4); d = rnd(1, 4); }
          else { a = rnd(1, 6); b = rnd(1, 9); c = rnd(1, 6); d = rnd(1, 9); }
          p1 = a * c; p2 = a * d + b * c; p3 = b * d;
        } while (i < 2 ? p1 > 9 || p2 > 9 || p3 > 9 : p1 < 10 && p2 < 10 && p3 < 10);
        const x = a * 10 + b, y = c * 10 + d, ans = x * y;
        const raw = p1 * 100 + p2 * 10 + p3;
        const note = p1 > 9 || p2 > 9 || p3 > 9 ? 'Carry the tens to the left' : 'Write them side by side';
        return q(`${x} × ${y} = ?`, ans, [ans + 10, ans - 10, ans + 100, raw], `${a}×${c} = ${p1} | ${a}×${d} + ${b}×${c} = ${p2} | ${b}×${d} = ${p3}. ${note}: **${ans}**!`);
      }),
  },
  {
    id: 'duplex',
    name: 'Duplex Palace',
    emoji: '🔷',
    color: '#3d348b',
    technique: 'Squaring with the Duplex',
    blurb: 'Square any 2-digit number',
    parentTip: 'Three parts: first², double the cross product, last². Then carry.',
    lesson: [
      { say: 'Square any 2-digit number in 3 parts! **12 × 12**: first², cross × 2, last².', boards: [{ type: 'eq', lines: [['12', '×', '12', '=', '?']] }] },
      { say: 'First: 1² = **1**. Middle: 2 × 1 × 2 = **4**. Last: 2² = **4**.', boards: [{ type: 'eq', lines: [['a:1', '|', 'b:4', '|', 'c:4']] }] },
      { say: 'Join: **1 | 4 | 4** → **144**! Carry if a part is 10 or more: 23² → 4 | 12 | 9 → **529**.', boards: [{ type: 'eq', lines: [['a:1', 'b:4', 'c:4', '=', '144'], ['a:4', '|', 'b:12', '|', 'c:9', '=', '529']] }] },
    ],
    make: () => {
      const easy = shuffle([[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [3, 1]]).slice(0, 3);
      const out = easy.map(([a, b]) => mk(a, b));
      const seen = new Set(out.map((o) => o.text));
      while (out.length < 6) {
        const a = rnd(1, 6), b = rnd(1, 9);
        if (a * a < 10 && 2 * a * b < 10 && b * b < 10) continue;
        const item = mk(a, b);
        if (seen.has(item.text)) continue;
        seen.add(item.text);
        out.push(item);
      }
      return out;
      function mk(a, b) {
        const n = a * 10 + b, ans = n * n;
        const p1 = a * a, p2 = 2 * a * b, p3 = b * b;
        const carry = p1 > 9 || p2 > 9 || p3 > 9;
        return q(`${n} × ${n} = ?`, ans, [ans + 10, ans - 10, ans + 100, p1 * 100 + p2 * 10 + p3], `${a}² = ${p1} | 2×${a}×${b} = ${p2} | ${b}² = ${p3}. ${carry ? 'Carry the tens to the left' : 'Join them'}: **${ans}**!`);
      }
    },
  },
  {
    id: 'sqrt',
    name: 'Root Forest',
    emoji: '🌳',
    color: '#386641',
    technique: 'Square roots of perfect squares',
    blurb: 'Last digit + front part = the root',
    parentTip: 'Learn the pairs: squares ending in 1 → 1 or 9; 4 → 2 or 8; 9 → 3 or 7; 6 → 4 or 6.',
    lesson: [
      { say: 'Square roots! What number times itself is **576**?', boards: [{ type: 'eq', lines: [['√576', '=', '?']] }] },
      { say: 'The last digit is **6**, so the root ends in **4** or **6**.', boards: [{ type: 'eq', lines: [['4', '×', '4', '=', 'a:16'], ['6', '×', '6', '=', 'a:36']] }] },
      { say: 'The front part **5** sits between 2² = 4 and 3² = 9, so the tens digit is **2**: 24 or 26.', boards: [{ type: 'eq', lines: [['a:4', '<', '5', '<', 'a:9']] }] },
      { say: 'Check 25² = 625. 576 is smaller, so it is **24**! 24 × 24 = 576 ✓', boards: [{ type: 'eq', lines: [['25²', '=', 'a:625'], ['√576', '=', 'c:24']] }] },
    ],
    make: () => {
      const small = shuffle(Array.from({ length: 20 }, (_, i) => i + 12).filter((n) => n % 10)).slice(0, 3);
      const big = shuffle(Array.from({ length: 68 }, (_, i) => i + 32).filter((n) => n % 10)).slice(0, 3);
      return [...small, ...big].map((n) => {
        const sq = n * n, u = n % 10, t = Math.floor(n / 10), front = Math.floor(sq / 100);
        let hint;
        const traps = [n + 10, n - 10, n + 1];
        if (u === 5) {
          hint = `${sq} ends in 5, so the root ends in 5. The front part ${front} is between ${t}² = ${t * t} and ${(t + 1) ** 2}, so the tens digit is ${t}: **${n}**!`;
        } else {
          const lo = Math.min(u, 10 - u), hi = Math.max(u, 10 - u), mid = (10 * t + 5) ** 2;
          const smaller = sq < mid;
          traps.unshift(10 * t + (10 - u));
          hint = `${sq} ends in ${sq % 10}, so the root ends in ${lo} or ${hi}. The front part ${front} is between ${t}² = ${t * t} and ${(t + 1) ** 2}, so the tens digit is ${t}. ${t}5² = ${mid} and ${sq} is ${smaller ? 'smaller' : 'bigger'}, so pick the ${smaller ? 'smaller' : 'bigger'} one: **${n}**!`;
        }
        return q(`√${sq} = ?`, n, traps, hint);
      });
    },
  },
];
