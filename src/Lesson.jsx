import { useState } from 'react';
import { WORLDS } from './content';
import { Board, Hero, Rich } from './ui';

export default function Lesson({ worldIndex, go, sound }) {
  const w = WORLDS[worldIndex];
  const [i, setI] = useState(0);
  const step = w.lesson[i];
  const last = i === w.lesson.length - 1;

  return (
    <main className="screen lesson" style={{ '--c': w.color }}>
      <header className="bar">
        <button className="back" onClick={() => go('map')} aria-label="Back to map">←</button>
        <h2>{w.technique}</h2>
        <span className="count">{i + 1}/{w.lesson.length}</span>
      </header>

      <div className="steps" aria-hidden="true">
        {w.lesson.map((_, k) => (
          <span key={k} className={k <= i ? 'on' : ''} />
        ))}
      </div>

      <div className="stage" key={i}>
        {step.boards.map((b, k) => (
          <Board board={b} key={k} />
        ))}
      </div>

      <div className="speech big">
        <Hero size={58} mood={last ? 'win' : 'cool'} />
        <p><Rich text={step.say} /></p>
      </div>

      <div className="row bottom">
        {i > 0 && (
          <button className="btn ghost" onClick={() => setI(i - 1)}>← Back</button>
        )}
        {last ? (
          <button className="btn big" onClick={() => go('quiz', worldIndex)}>Fight the monsters! ⚔️</button>
        ) : (
          <button className="btn big" onClick={() => setI(i + 1)}>Next →</button>
        )}
      </div>
    </main>
  );
}
