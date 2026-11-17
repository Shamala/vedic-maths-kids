import { useState } from 'react';
import { WORLDS, levelOf } from './content';
import { isUnlocked } from './store';
import { Stars, Vinu } from './ui';

export default function MapScreen({ state, setState, go, install }) {
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState('');
  const lvl = levelOf(state.xp);

  const tap = (w, i) => {
    if (!isUnlocked(WORLDS, i, state)) {
      setToast(`Finish ${WORLDS[i - 1].name} first! 🔒`);
      setTimeout(() => setToast(''), 2200);
      return;
    }
    setSheet(i);
  };

  return (
    <main className="screen">
      <header className="top">
        <div className="who">
          <span className="me">{state.child.avatar}</span>
          <div>
            <strong>{state.child.name}</strong>
            <div className="lvl">Lv {lvl.n} · {lvl.title}</div>
          </div>
        </div>
        <div className="chips">
          <span className="chip" title="Day streak">🔥 {state.streak.count}</span>
          <button className="chip btn-chip" aria-label={state.sound ? 'Mute sound' : 'Turn sound on'} onClick={() => setState((s) => ({ ...s, sound: !s.sound }))}>
            {state.sound ? '🔊' : '🔇'}
          </button>
          <button className="chip btn-chip" aria-label="Parent area" onClick={() => go('parent')}>
            👨‍👩‍👧
          </button>
        </div>
      </header>
      <div className="xpbar" aria-label={`${lvl.pct} of 100 XP to next level`}>
        <div style={{ width: `${lvl.pct}%` }} />
      </div>

      <div className="speech">
        <Vinu size={44} />
        <p>{state.xp === 0 ? 'Tap the first island to start your adventure!' : 'Pick an island and learn a new trick!'}</p>
      </div>

      <ol className="path">
        {WORLDS.map((w, i) => {
          const unlocked = isUnlocked(WORLDS, i, state);
          const stars = state.worlds[w.id]?.stars || 0;
          return (
            <li key={w.id} className={`node-row ${i % 2 ? 'right' : 'left'}`}>
              <button className={`node ${unlocked ? '' : 'locked'}`} style={{ '--c': w.color }} onClick={() => tap(w, i)} aria-label={`${w.name}${unlocked ? '' : ', locked'}`}>
                <span className="node-emoji">{unlocked ? w.emoji : '🔒'}</span>
              </button>
              <div className="node-label">
                <strong>{w.name}</strong>
                <small>{w.technique}</small>
                <Stars n={stars} size={18} />
              </div>
            </li>
          );
        })}
      </ol>

      {install && (
        <button className="btn ghost install" onClick={install}>
          📲 Add to home screen
        </button>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}

      {sheet !== null && (
        <div className="overlay" onClick={() => setSheet(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={WORLDS[sheet].name}>
            <div className="sheet-emoji" style={{ background: WORLDS[sheet].color }}>{WORLDS[sheet].emoji}</div>
            <h2>{WORLDS[sheet].name}</h2>
            <p className="tech">{WORLDS[sheet].technique}</p>
            <p>{WORLDS[sheet].blurb}</p>
            <div className="row">
              <button className="btn" onClick={() => go('lesson', sheet)}>📖 Learn</button>
              <button className="btn alt" onClick={() => go('quiz', sheet)}>🎮 Play</button>
            </div>
            <button className="link" onClick={() => setSheet(null)}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
