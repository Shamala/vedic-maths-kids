import { useEffect, useMemo, useRef } from 'react';
import { palmSVG } from './art';
import { WORLDS } from './content';
import { LAYOUT, W } from './mapLayout';
import { isUnlocked } from './store';
import { Hero, Stars } from './ui';

const PALM = palmSVG();

export default function SeaMap({ state, onTap }) {
  const L = LAYOUT;
  const unlocked = WORLDS.map((_, i) => isUnlocked(WORLDS, i, state));
  const stars = WORLDS.map((w) => state.worlds[w.id]?.stars || 0);
  // the hero stands on the first unlocked level that hasn't been beaten yet
  let current = WORLDS.findIndex((_, i) => unlocked[i] && stars[i] === 0);
  if (current < 0) current = WORLDS.length - 1;
  const reachedY = Math.max(...L.nodes.filter((n) => unlocked[n.i]).map((n) => n.y)) + 6;
  const curRef = useRef(null);

  useEffect(() => {
    if (current > 1) curRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clouds = useMemo(
    () => [0, 1, 2, 3, 4, 5].map((i) => ({ top: 60 + i * (L.H / 6.2), left: (i * 37) % 70, dur: 55 + i * 9, delay: -i * 11, size: 2 + (i % 3) * 0.7 })),
    [L.H]
  );

  return (
    <div className="seamap" style={{ aspectRatio: `${W} / ${L.H}` }}>
      <div className="waves w1" />
      <div className="waves w2" />

      <div className="sunbox" aria-hidden="true">
        <div className="sunburst" />
        <div className="suncore" />
      </div>
      {clouds.map((c, i) => (
        <span key={i} className="cloud" aria-hidden="true" style={{ top: c.top, left: `${c.left}%`, fontSize: `${c.size}rem`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>☁️</span>
      ))}

      <svg className="mapsvg" viewBox={`0 0 ${W} ${L.H}`} aria-hidden="true">
        <defs>
          <clipPath id="reached"><rect x="0" y="0" width={W} height={reachedY} /></clipPath>
          <radialGradient id="sandg" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#fff1c4" /><stop offset="1" stopColor="#f3d489" /></radialGradient>
        </defs>

        {L.islands.map((is) => (
          <g key={is.k}>
            <g transform={`translate(${is.cx} ${is.cy}) scale(1.22) translate(${-is.cx} ${-is.cy})`}><path d={is.d} fill="#8ff0f2" opacity=".55" className="shallow" /></g>
            <g transform={`translate(${is.cx} ${is.cy}) scale(1.08) translate(${-is.cx} ${-is.cy})`}><path d={is.d} fill="#fff" opacity=".85" className="foam" /></g>
            <path d={is.d} fill="url(#sandg)" stroke="#dfbb6c" strokeWidth="3" />
            <g transform={`translate(${is.cx} ${is.cy}) scale(.78) translate(${-is.cx} ${-is.cy})`}><path d={is.d} fill="#fff8dc" opacity=".55" /></g>
          </g>
        ))}

        {L.islands.flatMap((is) =>
          is.palms.map((p, i) => (
            <g key={`${is.k}-${i}`} transform={`translate(${p.x} ${p.y}) scale(${p.flip ? -p.s : p.s} ${p.s}) translate(-35 -98)`}>
              <ellipse cx="35" cy="98" rx="17" ry="4" fill="#c9a24e" opacity=".5" />
              <g className="palm" style={{ animationDelay: `${p.delay}s` }} dangerouslySetInnerHTML={{ __html: PALM }} />
            </g>
          ))
        )}

        {/* treasure-map trail: all dots in white, the part you have reached in red */}
        <path d={L.pathD} className="trail" />
        <path d={L.pathD} className="trail done" clipPath="url(#reached)" />

        <g transform={`translate(${L.treasure.x} ${L.treasure.y})`} className="xmark">
          <path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
          <path d="M-12 -12 L12 12 M12 -12 L-12 12" stroke="#d62839" strokeWidth="6.5" strokeLinecap="round" />
        </g>
      </svg>

      <div className="ship" style={{ left: `${(L.start.x / W) * 100}%`, top: `${(L.start.y / L.H) * 100}%` }} aria-hidden="true">⛵<small>Start</small></div>
      <div className="chest" style={{ left: `${((L.treasure.x + 30) / W) * 100}%`, top: `${((L.treasure.y - 22) / L.H) * 100}%` }} aria-hidden="true">💰</div>

      {L.signs.map((s) => (
        <div key={s.realm.id} className="sign" style={{ left: `${(s.x / W) * 100}%`, top: `${(s.y / L.H) * 100}%` }}>
          <b>{s.realm.emoji} {s.realm.name}</b>
          <small>{s.realm.age}</small>
        </div>
      ))}

      {L.nodes.map((n) => {
        const w = WORLDS[n.i];
        const isCur = n.i === current;
        return (
          <button
            key={w.id}
            ref={isCur ? curRef : null}
            className={`mnode ${unlocked[n.i] ? '' : 'locked'} ${isCur ? 'current' : ''}`}
            style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / L.H) * 100}%`, '--c': w.color }}
            onClick={() => onTap(w, n.i)}
            aria-label={`Level ${n.i + 1}: ${w.name}${unlocked[n.i] ? '' : ', locked'}`}
          >
            {isCur && <span className="mhero"><Hero size={36} mood="win" /></span>}
            <span className="mcircle">
              <span className="mnum">{n.i + 1}</span>
              {unlocked[n.i] ? w.emoji : '🔒'}
            </span>
            <span className="mlabel">
              <strong>{w.name}</strong>
              <Stars n={stars[n.i]} size={14} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
