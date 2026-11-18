import { useCallback, useEffect, useState } from 'react';
import Lesson from './Lesson';
import MapScreen from './MapScreen';
import Parent from './Parent';
import Quiz from './Quiz';
import Result from './Result';
import Welcome from './Welcome';
import { applyRound, load, save } from './store';

const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone;

export default function App() {
  const [state, setState] = useState(load);
  const [view, setView] = useState({ name: 'map', i: 0, k: 0 });
  const [result, setResult] = useState(null);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => save(state), [state]);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', () => setPrompt(null));
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  const install = prompt
    ? async () => {
        prompt.prompt();
        await prompt.userChoice;
        setPrompt(null);
      }
    : null;

  const go = useCallback((name, i = 0) => {
    setView({ name, i, k: Date.now() });
    window.scrollTo(0, 0);
  }, []);

  const lose = (r) => setState((s) => applyRound(s, r));

  const finish = (r, i) => {
    setState((s) => applyRound(s, r));
    setResult(r);
    go('result', i);
  };

  if (!state.child) {
    return <Welcome onDone={(child) => setState((s) => ({ ...s, child }))} />;
  }

  switch (view.name) {
    case 'lesson':
      return <Lesson key={`l${view.i}`} worldIndex={view.i} go={go} sound={state.sound} />;
    case 'quiz':
      return <Quiz key={`q${view.i}-${view.k}`} worldIndex={view.i} go={go} sound={state.sound} onFinish={finish} onLose={lose} />;
    case 'result':
      return <Result result={result} worldIndex={view.i} go={go} sound={state.sound} />;
    case 'parent':
      return <Parent state={state} setState={setState} go={go} install={install} isIOS={isIOS} />;
    default:
      return <MapScreen state={state} setState={setState} go={go} install={install || (isIOS ? () => go('parent') : null)} />;
  }
}
