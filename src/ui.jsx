import { useMemo } from 'react';

export const Rich = ({ text }) => (
  <>
    {String(text)
      .split(/(\*\*.+?\*\*)/g)
      .map((p, i) => (p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p))}
  </>
);

export const Vinu = ({ size = 64, mood = '' }) => (
  <span className={`vinu ${mood}`} style={{ fontSize: size }} role="img" aria-label="Vinu the owl">
    🦉
  </span>
);

export const Stars = ({ n, max = 3, size = 22 }) => (
  <span className="stars" aria-label={`${n} of ${max} stars`} style={{ fontSize: size }}>
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < n ? 'on' : 'off'}>
        ★
      </span>
    ))}
  </span>
);

export function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        e: ['🎉', '⭐', '✨', '🎊', '🌟'][i % 5],
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        dur: 2.2 + Math.random() * 1.8,
      })),
    []
  );
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s` }}>
          {b.e}
        </span>
      ))}
    </div>
  );
}

function Token({ t }) {
  const m = /^([abc]):(.*)$/.exec(t);
  return <span className={`tok ${m ? m[1] : ''}`}>{m ? m[2] : t}</span>;
}

export function Board({ board }) {
  if (board.type === 'dots') {
    return (
      <div className="dots" aria-label={`${board.n} filled out of 10`}>
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={i < board.n ? 'dot a' : 'dot b'} />
        ))}
      </div>
    );
  }
  return (
    <div className="eq">
      {board.lines.map((line, i) => (
        <div className="eq-line" key={i}>
          {line.map((t, j) => (
            <Token t={t} key={j} />
          ))}
        </div>
      ))}
    </div>
  );
}
