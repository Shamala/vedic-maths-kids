import { useEffect, useMemo, useRef, useState } from 'react';
import { MAX_BITES, MONSTER_KINDS } from './art';
import { WORLDS, buildLevel, rnd } from './content';
import { play } from './sound';
import { Hero, Monster, MonsterShower, Palm, Rich, SCARED, SprinkleShower, Stars } from './ui';

export const CHANCES = 5; // 5 wrong answers in total (across the whole level) and the monster gobbles the cupcake
export const starsFor = (wrong) => (wrong <= 1 ? 3 : wrong <= 3 ? 2 : 1);

export default function Quiz({ worldIndex, go, sound, onFinish, onLose }) {
  const w = WORLDS[worldIndex];
  const questions = useMemo(() => buildLevel(w), [w]);
  const started = useRef(Date.now());
  const timer = useRef();
  const strikesRef = useRef(0);
  const [idx, setIdx] = useState(0);
  const [wrongPicks, setWrongPicks] = useState([]);
  const [solved, setSolved] = useState(false);
  const [strikes, setStrikes] = useState(0); // every wrong answer eats a bite
  const [firstTry, setFirstTry] = useState(0);
  const [fx, setFx] = useState('');
  const [lost, setLost] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  // villagers scatter in fear in random directions
  const flee = useMemo(
    () => questions.map(() => ({ '--dx': `${rnd(20, 250)}px`, '--dy': `${rnd(-125, -5)}px`, '--r': `${rnd(-40, 40)}deg` })),
    [questions]
  );

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
    strikesRef.current += 1;
    const n = strikesRef.current;
    setStrikes(n);
    if (n >= CHANCES) {
      setLost(true);
      setFx('');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setShowRestart(true), 1500);
      onLose({ id: w.id, stars: 0, firstTry, retried: idx + 1 - firstTry, secs: secs(), xp: 0 });
      return;
    }
    setFx('bite');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFx(''), 850);
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setWrongPicks([]);
      setSolved(false);
      return;
    }
    const stars = starsFor(strikes);
    onFinish({ id: w.id, stars, firstTry, retried: questions.length - firstTry, strikes, total: questions.length, secs: secs(), xp: firstTry * 10 + (questions.length - firstTry) * 5 + stars * 5 }, worldIndex);
  };

  const left = Math.max(0, CHANCES - strikes);
  const saved = idx + (solved ? 1 : 0);
  const kind = MONSTER_KINDS[idx % MONSTER_KINDS.length];
  const bites = Math.min(strikes, MAX_BITES);

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
        <Stars n={lost ? 0 : starsFor(strikes)} size={22} />
        <span className="chances" aria-label={`${left} chances left`}>
          {Array.from({ length: CHANCES }, (_, i) => (
            <span key={i} className={i < left ? 'chance' : 'chance used'}>🧁</span>
          ))}
        </span>
      </div>

      <div className={`scene ${fx} ${solved ? 'won' : ''} ${lost ? 'gobbled' : ''}`}>
        <div className="sea-w" />
        <Palm className="palm-s ps1" />
        <Palm className="palm-s ps2" />
        <span className="hut">🛖</span>
        <div className="villagers" aria-label={lost ? 'The little people are running away in fear' : `${saved} of ${questions.length} little people saved`}>
          {questions.map((_, i) => (
            <span key={i} className={lost ? 'flee' : i < saved ? 'ok' : 'scared'} style={lost ? flee[i] : undefined}>
              {lost ? SCARED[i] : i < saved ? '😄' : SCARED[i]}
            </span>
          ))}
        </div>
        <div className="hero-wrap"><Hero size={112} mood={lost || fx === 'bite' ? 'hit' : solved ? 'win' : 'cool'} bites={lost ? MAX_BITES : bites} /></div>
        <div className={`monster-wrap ${solved ? 'poof' : ''}`} key={lost ? 'gobble' : idx}>
          <Monster kind={kind} size={lost ? 124 : idx === questions.length - 1 ? 116 : 100} />
        </div>
        {lost && (
          <div className="crumbs" aria-hidden="true">
            {['🍬', '🧁', '✨', '🍬', '🧁', '✨'].map((c, i) => <span key={i} style={{ '--cx': `${(i - 2.5) * 34}px`, '--cy': `${-30 - (i % 3) * 22}px` }}>{c}</span>)}
          </div>
        )}
        {solved && <div className="zap" aria-hidden="true">💥</div>}
        {lost && showRestart && (
          <div className="restart-overlay">
            <button className="btn big restart" onClick={() => go('quiz', worldIndex)}>Restart level 🔁</button>
          </div>
        )}
      </div>

      {solved && <SprinkleShower key={idx} />}
      {lost && <MonsterShower />}

      {lost ? (
        <>
          <h1 className="title lost-title">Oh no!</h1>
          <p className="lead center-text">The monster gobbled up Commander Cupcake and the little people ran away! Learn the trick again and save them.</p>
          <div className="row">
            <button className="btn alt" onClick={() => go('lesson', worldIndex)}>Review lesson 📖</button>
            <button className="btn ghost" onClick={() => go('map')}>Back to map</button>
          </div>
        </>
      ) : (
        <>
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
              {solved ? <b>{missed ? 'Monster defeated! ' : 'Zap! Monster defeated! '}</b> : <b>Chomp! {left === 1 ? 'Last chance!' : `${left} ${left === 1 ? 'chance' : 'chances'} left.`} </b>}
              {(missed || solved) && <Rich text={`Vedic way: ${q.hint}`} />}
            </p>
          </div>

          {solved && (
            <button className="btn big next" onClick={next}>
              {idx + 1 < questions.length ? 'Next monster →' : 'Save the island! 🏝️'}
            </button>
          )}
        </>
      )}
    </main>
  );
}
