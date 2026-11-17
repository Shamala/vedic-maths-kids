# Vedic Maths Kids 🦉

An installable React app (PWA) that teaches children aged 6-8 maths using Vedic techniques, as a game-like island adventure with Vinu the owl.

## Islands (techniques)

| Island | Technique |
| --- | --- |
| Ten Friends Island | Friends of 10 |
| Cut-Down Cove | All from 9, the last from 10 (100 − 37) |
| Nine Nest | Add 10, take back (+9, +8) |
| Rocket Table Rise | Nikhilam: 7, 8, 9 tables |
| Eleven Echo Canyon | Multiply by 11 |
| Five Fort | Squares of numbers ending in 5 |

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
