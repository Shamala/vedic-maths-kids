import { useEffect } from 'react';
import { WORLDS } from './content';
import { play } from './sound';
import { Confetti, Hero, Stars } from './ui';

export default function Result({ result, worldIndex, go, sound }) {
  const w = WORLDS[worldIndex];
  const hasNext = worldIndex + 1 < WORLDS.length;
  useEffect(() => play('star', sound), [sound]);
  return (
    <main className="screen center result" style={{ '--c': w.color }}>
      {result.stars === 3 && <Confetti />}
      <Hero size={110} mood="win" bites={result.retried} className="bounce" />
      <h1 className="title">{result.stars === 3 ? 'Island saved!' : result.stars === 2 ? 'Great job, hero!' : 'You did it!'}</h1>
      <Stars n={result.stars} size={56} />
      <div className="card tally">
        <p className="saved">😄😄😄😄😄😄</p>
        <p>All 6 little people saved!</p>
        <p><b>{result.firstTry}</b> of 6 monsters beaten first time</p>
        <p className="xp">+{result.xp} XP ⚡</p>
      </div>
      <div className="row col">
        {hasNext && result.stars >= 1 && (
          <button className="btn big" onClick={() => go('lesson', worldIndex + 1)}>Next island 🏝️</button>
        )}
        <button className="btn alt" onClick={() => go('quiz', worldIndex)}>Play again 🔁</button>
        <button className="btn ghost" onClick={() => go('map')}>Back to map</button>
      </div>
    </main>
  );
}
