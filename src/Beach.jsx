import { Palm } from './ui';

// Sunny animated beach behind every screen: rotating sun rays, drifting clouds,
// rolling waves, sand and swaying coconut palms.
export default function Beach() {
  return (
    <div className="beach" aria-hidden="true">
      <div className="sunbox"><div className="sunburst" /><div className="suncore" /></div>
      <span className="cloud b1">☁️</span>
      <span className="cloud b2">☁️</span>
      <span className="cloud b3">☁️</span>
      <div className="seaband"><div className="waves w1" /><div className="waves w2" /></div>
      <div className="sandband" />
      <Palm className="bp bp1" />
      <Palm className="bp bp2" />
      <Palm className="bp bp3" />
    </div>
  );
}
