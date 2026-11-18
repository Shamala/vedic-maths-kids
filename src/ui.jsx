import { useId, useMemo } from 'react';
import { MONSTER_KINDS, cupcakeSVG, monsterSVG, palmSVG } from './art';

export const Rich = ({ text }) => (
  <>
    {String(text)
      .split(/(\*\*.+?\*\*)/g)
      .map((p, i) => (p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p))}
  </>
);

// Cupcake Hero. mood: cool | hit | win. bites: 0..6 chunks eaten.
export function Hero({ size = 80, mood = 'cool', bites = 0, className = '' }) {
  const id = 'c' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const html = useMemo(() => cupcakeSVG({ bites, mood, id }), [bites, mood, id]);
  return (
    <svg
      className={`hero ${mood} ${className}`}
      viewBox="0 0 160 180"
      width={size}
      height={size * 1.125}
      role="img"
      aria-label={bites >= 6 ? 'Cupcake Hero, all eaten' : `Cupcake Hero${bites ? `, ${bites} bites eaten` : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function Monster({ kind = 'gloop', size = 110, className = '' }) {
  const html = useMemo(() => monsterSVG(kind), [kind]);
  return <svg className={`monster ${className}`} viewBox="0 0 140 140" width={size} height={size} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}

export const SCARED = ['😨', '😱', '😰', '🥺', '😟', '😧', '😢', '😭', '😬', '🙀'];

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
        e: ['🧁', '⭐', '✨', '🍬', '🌟'][i % 5],
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

export function Palm({ className = '', style }) {
  const html = useMemo(() => palmSVG(), []);
  return <svg className={`palm ${className}`} style={style} viewBox="0 0 70 100" aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}

const SPRINKLE_COLORS = ['#ff6b81', '#ffd60a', '#4cc9f0', '#7ae582', '#9b5de5', '#ff9f1c', '#ffffff'];

// Rainbow sprinkles rain down when a monster is defeated
export function SprinkleShower() {
  const bits = useMemo(
    () =>
      Array.from({ length: 56 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 1.3 + Math.random() * 1.1,
        rot: Math.round((Math.random() - 0.5) * 900),
        w: 10 + Math.random() * 8,
        c: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
      })),
    []
  );
  return (
    <div className="shower" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={{ left: `${b.left}%`, width: b.w, background: b.c, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, '--rot': `${b.rot}deg` }} />
      ))}
    </div>
  );
}

// A rain of little monsters when the cupcake is gobbled up
export function MonsterShower() {
  const bits = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        kind: MONSTER_KINDS[i % MONSTER_KINDS.length],
        left: Math.random() * 92,
        size: 34 + Math.random() * 22,
        delay: Math.random() * 1.1,
        dur: 2.2 + Math.random() * 1.6,
        rot: Math.round((Math.random() - 0.5) * 120),
      })),
    []
  );
  return (
    <div className="shower monsters" aria-hidden="true">
      {bits.map((b, i) => (
        <span key={i} style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, '--rot': `${b.rot}deg` }}>
          <Monster kind={b.kind} size={b.size} />
        </span>
      ))}
    </div>
  );
}
