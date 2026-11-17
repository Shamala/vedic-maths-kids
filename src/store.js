const KEY = 'vedic-maths-kids-v1';

export const fresh = () => ({
  child: null, // { name, avatar }
  worlds: {}, // id -> { stars, plays, firstTry, retried, last }
  xp: 0,
  streak: { count: 0, last: null },
  sessions: [], // { ts, id, firstTry, retried, secs }
  sound: true,
});

export function load() {
  try {
    return { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return fresh();
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable (private mode) */
  }
}

export const dayKey = (d = new Date()) => d.toLocaleDateString('en-CA');

// Apply a finished round to the state and return the new state
export function applyRound(s, r) {
  const prev = s.worlds[r.id] || { stars: 0, plays: 0, firstTry: 0, retried: 0 };
  const today = dayKey();
  const yesterday = dayKey(new Date(Date.now() - 864e5));
  const streak =
    s.streak.last === today
      ? s.streak
      : { count: s.streak.last === yesterday ? s.streak.count + 1 : 1, last: today };
  return {
    ...s,
    xp: s.xp + r.xp,
    streak,
    worlds: {
      ...s.worlds,
      [r.id]: {
        stars: Math.max(prev.stars, r.stars),
        plays: prev.plays + 1,
        firstTry: prev.firstTry + r.firstTry,
        retried: prev.retried + r.retried,
        last: Date.now(),
      },
    },
    sessions: [{ ts: Date.now(), id: r.id, firstTry: r.firstTry, retried: r.retried, secs: r.secs }, ...s.sessions].slice(0, 300),
  };
}

export const isUnlocked = (worlds, index, state) => index === 0 || (state.worlds[worlds[index - 1].id]?.stars || 0) >= 1;
