import { useEffect } from 'react';
import { WORLDS } from './content';
import { play } from './sound';
import { Confetti, Stars, Vinu } from './ui';

export default function Result({ result, worldIndex, go, sound }) {
  const w = WORLDS[worldIndex];
  const hasNext = worldIndex + 1 < WORLDS.length;
  useEffect(() => play('star', sound), [sound]);
  return (
    <main className="screen center result" style={{ '--c': w.color }}>
      {result.stars === 3 && <Confetti />}
      <Vinu size={88} mood="bounce" />
      <h1 className="title">{result.stars === 3 ? 'Super star!' : result.stars === 2 ? 'Great job!' : 'Well done!'}</h1>
      <Stars n={result.stars} size={56} />
      <div className="card tally">
        <p><b>{result.firstTry}</b> of 6 right the first time</p>
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
