import { useMemo, useState } from 'react';
import { WORLDS, levelOf } from './content';
import { dayKey, fresh } from './store';
import { Stars } from './ui';

const pct = (a, b) => (a + b ? Math.round((a / (a + b)) * 100) : null);

function Gate({ onPass, onBack }) {
  const sum = useMemo(() => {
    const a = 20 + Math.floor(Math.random() * 60), b = 11 + Math.floor(Math.random() * 38);
    return { a, b };
  }, []);
  const [v, setV] = useState('');
  const [bad, setBad] = useState(false);
  return (
    <main className="screen center">
      <h1 className="title small">Grown-ups only</h1>
      <form
        className="card form"
        onSubmit={(e) => {
          e.preventDefault();
          if (Number(v) === sum.a + sum.b) onPass();
          else { setBad(true); setV(''); }
        }}
      >
        <label htmlFor="g">What is {sum.a} + {sum.b}?</label>
        <input id="g" inputMode="numeric" value={v} onChange={(e) => setV(e.target.value)} autoComplete="off" />
        {bad && <p className="err" role="alert">Not quite. Try again.</p>}
        <button className="btn" disabled={!v}>Open</button>
        <button type="button" className="link" onClick={onBack}>← Back to the game</button>
      </form>
    </main>
  );
}

export default function Parent({ state, setState, go, install, isIOS }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(state.child.name);
  const [confirm, setConfirm] = useState(false);

  const stats = useMemo(() => {
    const ft = Object.values(state.worlds).reduce((n, w) => n + w.firstTry, 0);
    const rt = Object.values(state.worlds).reduce((n, w) => n + w.retried, 0);
    const secs = state.sessions.reduce((n, s) => n + s.secs, 0);
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(Date.now() - (6 - i) * 864e5);
      const key = dayKey(d);
      const n = state.sessions.filter((s) => dayKey(new Date(s.ts)) === key).reduce((m, s) => m + s.firstTry + s.retried, 0);
      return { label: d.toLocaleDateString('en', { weekday: 'short' }).slice(0, 2), n };
    });
    const played = WORLDS.map((w) => ({ w, s: state.worlds[w.id] })).filter((x) => x.s);
    const weak = played.filter((x) => pct(x.s.firstTry, x.s.retried) < 80).sort((a, b) => pct(a.s.firstTry, a.s.retried) - pct(b.s.firstTry, b.s.retried))[0];
    const nextNew = WORLDS.find((w) => !state.worlds[w.id]);
    return { ft, rt, secs, days, focus: weak?.w || nextNew || null, weakReason: !!weak };
  }, [state]);

  if (!open) return <Gate onPass={() => setOpen(true)} onBack={() => go('map')} />;

  const lvl = levelOf(state.xp);
  const maxDay = Math.max(1, ...stats.days.map((d) => d.n));

  return (
    <main className="screen parent">
      <header className="bar">
        <button className="back" onClick={() => go('map')} aria-label="Back to the game">←</button>
        <h2>Parent dashboard</h2>
        <span />
      </header>

      <section className="card">
        <h3>{state.child.avatar} {state.child.name}</h3>
        <div className="kpis">
          <div><b>{lvl.n}</b><small>Level</small></div>
          <div><b>{state.xp}</b><small>XP</small></div>
          <div><b>🔥 {state.streak.count}</b><small>Day streak</small></div>
          <div><b>{Math.round(stats.secs / 60)}</b><small>Minutes</small></div>
        </div>
        <p className="muted">{stats.ft + stats.rt} questions answered · {pct(stats.ft, stats.rt) ?? '–'}{pct(stats.ft, stats.rt) !== null ? '%' : ''} right on the first try</p>
      </section>

      <section className="card">
        <h3>Last 7 days</h3>
        <div className="bars" role="img" aria-label="Questions answered per day">
          {stats.days.map((d, i) => (
            <div key={i} className="barcol">
              <span className="n">{d.n || ''}</span>
              <div className="b" style={{ height: `${(d.n / maxDay) * 100}%` }} />
              <small>{d.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Skills</h3>
        {WORLDS.map((w) => {
          const s = state.worlds[w.id];
          const acc = s ? pct(s.firstTry, s.retried) : null;
          return (
            <div className="skill" key={w.id}>
              <div className="skill-head">
                <span>{w.emoji} {w.technique}</span>
                <Stars n={s?.stars || 0} size={16} />
              </div>
              <div className="meter" aria-label={acc === null ? 'Not started' : `${acc}% first-try accuracy`}>
                <div style={{ width: `${acc ?? 0}%`, background: acc !== null && acc < 70 ? '#ff9f1c' : '#43c463' }} />
              </div>
              <small className="muted">{s ? `${s.plays} play${s.plays > 1 ? 's' : ''} · ${acc}% first-try` : 'Not started yet'}</small>
            </div>
          );
        })}
      </section>

      {stats.focus && (
        <section className="card focus">
          <h3>💡 Focus next</h3>
          <p><b>{stats.focus.technique}</b> {stats.weakReason ? '(needs a little more practice)' : '(new)'}</p>
          <p className="muted">{stats.focus.parentTip}</p>
        </section>
      )}

      <section className="card">
        <h3>Settings</h3>
        <label htmlFor="rn">Child's name</label>
        <div className="row">
          <input id="rn" value={name} maxLength={14} onChange={(e) => setName(e.target.value)} />
          <button className="btn" disabled={!name.trim()} onClick={() => setState((s) => ({ ...s, child: { ...s.child, name: name.trim() } }))}>Save</button>
        </div>
        {install && <button className="btn ghost" onClick={install}>📲 Install on this device</button>}
        {isIOS && <p className="muted">iPhone/iPad: tap the Share button, then “Add to Home Screen”.</p>}
        {!confirm ? (
          <button className="btn danger" onClick={() => setConfirm(true)}>Reset all progress</button>
        ) : (
          <div className="row">
            <button className="btn danger" onClick={() => { setState({ ...fresh() }); go('map'); }}>Yes, erase everything</button>
            <button className="btn ghost" onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        )}
        <p className="muted small">Progress is saved only on this device. No account, no tracking.</p>
      </section>
    </main>
  );
}
