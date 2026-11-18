import { useMemo, useRef, useState } from 'react';
import { WORLDS } from './content';
import { play } from './sound';
import { Rich, Vinu } from './ui';

export default function Quiz({ worldIndex, go, sound, onFinish }) {
  const w = WORLDS[worldIndex];
  const questions = useMemo(() => w.make(), [w]);
  const started = useRef(Date.now());
  const [idx, setIdx] = useState(0);
  const [wrongPicks, setWrongPicks] = useState([]); // wrong options for this question
  const [solved, setSolved] = useState(false);
  const [tally, setTally] = useState({ firstTry: 0, retried: 0 });

  const q = questions[idx];
  const missed = wrongPicks.length > 0;

  const pick = (o) => {
    if (solved || wrongPicks.includes(o)) return;
    if (o === q.ans) {
      play('ok', sound);
      setSolved(true);
      setTally((t) => (missed ? { ...t, retried: t.retried + 1 } : { ...t, firstTry: t.firstTry + 1 }));
    } else {
      play('bad', sound);
      setWrongPicks((p) => [...p, o]);
    }
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setWrongPicks([]);
      setSolved(false);
      return;
    }
    const secs = Math.round((Date.now() - started.current) / 1000);
    const stars = tally.retried <= 1 ? 3 : tally.retried <= 3 ? 2 : 1;
    onFinish({ id: w.id, stars, firstTry: tally.firstTry, retried: tally.retried, secs, xp: tally.firstTry * 10 + tally.retried * 5 + stars * 5 }, worldIndex);
  };

  return (
    <main className="screen quiz" style={{ '--c': w.color }}>
      <header className="bar">
        <button className="back" onClick={() => go('map')} aria-label="Quit to map">✕</button>
        <div className="progress" aria-label={`Question ${idx + 1} of ${questions.length}`}>
          {questions.map((_, k) => (
            <span key={k} className={k < idx ? 'done' : k === idx ? 'now' : ''} />
          ))}
        </div>
        <button className="back" onClick={() => go('lesson', worldIndex)} aria-label="Re-read the lesson">💡</button>
      </header>

      <h1 className={`qtext ${q.text.length > 14 ? 'long' : ''}`} aria-live="polite">{q.text}</h1>

      <div className="answers">
        {q.options.map((o) => {
          const cls = solved && o === q.ans ? 'ans good' : wrongPicks.includes(o) ? 'ans bad' : 'ans';
          return (
            <button key={o} className={cls} onClick={() => pick(o)} disabled={wrongPicks.includes(o)}>
              {o}
            </button>
          );
        })}
      </div>

      <div className={`speech big ${missed || solved ? '' : 'hidden'}`} role="status">
        <Vinu size={52} mood={solved ? 'bounce' : 'shake'} />
        <p>
          {solved ? (missed ? <><b>You got it!</b> </> : <><b>Brilliant!</b> </>) : <><b>Oops, try again!</b> </>}
          {(missed || solved) && <Rich text={`Vedic way: ${q.hint}`} />}
        </p>
      </div>

      {solved && (
        <button className="btn big next" onClick={next}>
          {idx + 1 < questions.length ? 'Next →' : 'Finish 🏁'}
        </button>
      )}
    </main>
  );
}
