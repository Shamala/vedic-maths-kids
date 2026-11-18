# Maths with Commander Cupcake 🧁

**▶ Live app: https://shamala.github.io/vedic-maths-kids/**

An installable React app (PWA) that teaches children aged 6–12 maths with Vedic techniques. Monsters are attacking the little people on the island, and only **Cupcake Hero** (gold "C" chain, cool shades, red cape) can save them, by answering maths questions the Vedic way.

## How a level works

1. Learn the trick in a short lesson.
2. Fight 10 monsters, one question each. A right answer zaps the monster, a sprinkle shower falls and a little person is saved.
3. You get **5 chances in total** across the whole level. Every wrong answer lets the monster **bite** Cupcake Hero (the cupcake is eaten away) and the Vedic method is shown so the child can try again.
4. The **5th wrong answer** is the end: the monster gobbles up the cupcake, a little-monster shower falls, the little people scatter in fear, and a big **Restart level** button appears over the scene.
5. Stars: 0–1 wrong = ⭐⭐⭐, 2–3 wrong = ⭐⭐, 4 wrong = ⭐. Stars unlock the next island and are kept as a best score.

The artwork (hero and monsters) is original SVG in `src/art.js`. The chance rules live in `src/Quiz.jsx` (`CHANCES`).

## Islands (23, in three realms)

| Realm | Islands (techniques) |
| --- | --- |
| 🌱 Little Explorers (6–8) | Friends of 10 · Add 9s and 8s (add 10, take back) · Add from the left · Round and fix subtraction · All from 9, last from 10 · Double and halve |
| 🧭 Trick Trekkers (8–10) | Nikhilam tables 7/8/9 · Multiply by 11 · Multiply by 5 · Multiply by 25 and 50 · Multiply by 9 and 99 (Ekanyunena) · Flip the percent · Magic digit sum (Beejank) · Divisibility by 3, 9, 11 · Divide by 9 |
| 👑 Maths Maharajas (10–12) | Squares ending in 5 (Ekadhikena) · Squares near 50 · Squares near 100 · Nikhilam near 100 · ×11 with carry · Vertically and crosswise (Urdhva Tiryagbhyam) · Duplex squaring · Square roots |

New islands unlock one after another, so a child keeps learning new concepts as they level up. To add another island, add an entry in `src/more.js` and put its id in `ORDER` in `src/content.js`. `npm run check` verifies every generated question.

XP, ranks and daily streaks reward practice.

## Parent dashboard

Behind a grown-up maths gate: accuracy per technique, minutes practised, a 7-day activity chart and a "focus next" suggestion with an at-home tip. All data stays on the device (localStorage). No accounts, no tracking.

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # outputs dist/
```

## Install on a device

Open the hosted link, then:

- **Android/Chrome/Edge/desktop:** tap "Add to home screen" / the install icon.
- **iPhone/iPad:** Share → Add to Home Screen.

After the first visit it works fully offline.

## Hosting

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`. In the repo, set **Settings → Pages → Source: GitHub Actions** once. All paths are relative, so it works under `/<repo-name>/`.
