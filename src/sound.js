let ctx;
const NOTES = { ok: [660, 880], bad: [260, 200], star: [523, 659, 784, 1047], tap: [500] };

export function play(kind, enabled = true) {
  if (!enabled) return;
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    let t = ctx.currentTime;
    for (const f of NOTES[kind]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = kind === 'bad' ? 'triangle' : 'sine';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.24);
      t += 0.12;
    }
  } catch {
    /* audio is optional */
  }
}
