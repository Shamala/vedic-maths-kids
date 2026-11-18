import { useEffect, useMemo, useRef, useState } from 'react';
import { MAX_BITES, MONSTER_KINDS } from './art';
import { WORLDS } from './content';
import { play } from './sound';
import { Hero, Monster, Rich, SCARED, Stars } from './ui';

export const starsFor = (bites) => (bites <= 1 ? 3 : bites <= 3 ? 2 : 1);

export default function Quiz({ worldIndex, go, sound, onFinish, onLose }) {
  const w = WORLDS[worldIndex];
  const questions = useMemo(() => w.make(), [w]);
  const started = useRef(Date.now());
  const timer = useRef();
  const [idx, setIdx] = useState(0);
  const [wrongPicks, setWrongPicks] = useState([]);
  const [solved, setSolved] = useState(false);
  const [bites, setBites] = useState(0); // questions answered wrongly = chunks eaten
  const [firstTry, setFirstTry] = useState(0);
  const [fx, setFx] = useState('');
  const [lost, setLost] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const q = questions[idx];
  const missed = wrongPicks.length > 0;
  const secs = () => Math.round((Date.now() - started.current) / 1000);

  const pick = (o) => {
    if (solved || lost || wrongPicks.includes(o)) return;
    if (o === q.ans) {
      play('ok', sound);
      setSolved(true);
      if (!missed) setFirstTry((n) => n + 1);
      return;
    }
    play('bad', sound);
    setWrongPicks((p) => [...p, o]);
    setFx('bite');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFx(''), 850);
    if (!missed) {
      const nb = bites + 1;
      setBites(nb);
      if (nb >= MAX_BITES) {
        setLost(true);
        onLose({ id: w.id, stars: 0, firstTry, retried: MAX_BITES, secs: secs(), xp: 0 });
      }
    }
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setWrongPicks([]);
      setSolved(false);
      return;
    }
    const stars = starsFor(bites);
    onFinish({ id: w.id, stars, firstTry, retried: bites, secs: secs(), xp: firstTry * 10 + bites * 5 + stars * 5 }, worldIndex);
  };

  if (lost) {
    return (
      <main className="screen center lost" style={{ '--c': w.color }}>
        <div className="scene lostscene" aria-hidden="true">
          <div className="villagers">{SCARED.map((s, i) => <span key={i} className="scared">{s}</span>)}</div>
          <div className="hero-wrap"><Hero size={104} mood="hit" bites={MAX_BITES} /></div>
          <div className="monster-wrap smug"><Monster kind="boss" size={132} /></div>
        </div>
        <h1 className="title">Oh no!</h1>
        <p className="lead">The monsters gobbled up Cupcake Hero! Learn the trick again and save the little people.</p>
        <div className="row col">
          <button className="btn big" onClick={() => go('quiz', worldIndex)}>Try this level again 🔁</button>
          <button className="btn alt" onClick={() => go('lesson', worldIndex)}>Review the lesson 📖</button>
          <button className="btn ghost" onClick={() => go('map')}>Back to map</button>
        </div>
      </main>
    );
  }

  const saved = idx + (solved ? 1 : 0);
  const kind = MONSTER_KINDS[idx % MONSTER_KINDS.length];

  return (
    <main className="screen quiz" style={{ '--c': w.color }}>
      <header className="bar">
        <button className="back" onClick={() => go('map')} aria-label="Quit to map">✕</button>
        <div className="progress" aria-label={`Monster ${idx + 1} of ${questions.length}`}>
          {questions.map((_, k) => (
            <span key={k} className={k < idx || (k === idx && solved) ? 'done' : k === idx ? 'now' : ''} />
          ))}
        </div>
        <button className="back" onClick={() => go('lesson', worldIndex)} aria-label="Re-read the lesson">💡</button>
      </header>

      <div className="hud">
        <Stars n={starsFor(bites)} size={22} />
        <span className="hp">🧁 {MAX_BITES - bites}/{MAX_BITES} left</span>
      </div>

      <div className={`scene ${fx} ${solved ? 'won' : ''}`}>
        <span className="house h1">🏡</span>
        <span className="house h2">🏠</span>
        <div className="villagers" aria-label={`${saved} of ${questions.length} little people saved`}>
          {questions.map((_, i) => (
            <span key={i} className={i < saved ? 'ok' : 'scared'}>{i < saved ? '😄' : SCARED[i]}</span>
          ))}
        </div>
        <div className="hero-wrap"><Hero size={104} mood={fx === 'bite' ? 'hit' : solved ? 'win' : 'cool'} bites={bites} /></div>
        <div className={`monster-wrap ${solved ? 'poof' : ''}`} key={idx}><Monster kind={kind} size={idx === questions.length - 1 ? 132 : 108} /></div>
        {solved && <div className="zap" aria-hidden="true">💥</div>}
      </div>

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
        <span className="bubble-emoji">{solved ? '💥' : '😬'}</span>
        <p>
          {solved ? <b>{missed ? 'Monster defeated! ' : 'Zap! Monster defeated! '}</b> : <b>Chomp! Try again. </b>}
          {(missed || solved) && <Rich text={`Vedic way: ${q.hint}`} />}
        </p>
      </div>

      {solved && (
        <button className="btn big next" onClick={next}>
          {idx + 1 < questions.length ? 'Next monster →' : 'Save the island! 🏝️'}
        </button>
      )}
    </main>
  );
}
