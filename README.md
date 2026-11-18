# Vedic Maths Kids 🦉

**▶ Live app: https://shamala.github.io/vedic-maths-kids/**

An installable React app (PWA) that teaches children aged 6-8 maths using Vedic techniques, as a game-like island adventure with Vinu the owl.

## Islands (23, in three realms)

| Realm | Islands (techniques) |
| --- | --- |
| 🌱 Little Explorers (6–8) | Friends of 10 · Add 9s and 8s (add 10, take back) · Add from the left · Round and fix subtraction · All from 9, last from 10 · Double and halve |
| 🧭 Trick Trekkers (8–10) | Nikhilam tables 7/8/9 · Multiply by 11 · Multiply by 5 · Multiply by 25 and 50 · Multiply by 9 and 99 (Ekanyunena) · Flip the percent · Magic digit sum (Beejank) · Divisibility by 3, 9, 11 · Divide by 9 |
| 👑 Maths Maharajas (10–12) | Squares ending in 5 (Ekadhikena) · Squares near 50 · Squares near 100 · Nikhilam near 100 · ×11 with carry · Vertically and crosswise (Urdhva Tiryagbhyam) · Duplex squaring · Square roots |

New islands unlock one after another, so a child keeps learning new concepts as they level up. To add another island, add an entry in `src/more.js` and put its id in `ORDER` in `src/content.js`. `npm run check` verifies every generated question.

Each island has a short animated lesson, then a 6-question game. Wrong answers show the Vedic way, stars unlock the next island, and XP and streaks reward practice.

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
