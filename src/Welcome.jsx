import { useState } from 'react';
import { AVATARS } from './content';
import { Vinu } from './ui';

export default function Welcome({ onDone }) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  return (
    <main className="screen center">
      <Vinu size={96} mood="bounce" />
      <h1 className="title">Vedic Maths Kids</h1>
      <p className="lead">Hi! I'm Vinu the owl. Let's learn magic maths tricks from ancient India!</p>
      <form
        className="card form"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) onDone({ name: name.trim().slice(0, 14), avatar });
        }}
      >
        <label htmlFor="nm">What's your name?</label>
        <input id="nm" value={name} onChange={(e) => setName(e.target.value)} maxLength={14} placeholder="Type here" autoComplete="off" />
        <div className="avatars" role="radiogroup" aria-label="Pick your buddy">
          {AVATARS.map((a) => (
            <button type="button" key={a} role="radio" aria-checked={a === avatar} className={a === avatar ? 'av sel' : 'av'} onClick={() => setAvatar(a)}>
              {a}
            </button>
          ))}
        </div>
        <button className="btn big" disabled={!name.trim()}>
          Let's go! 🚀
        </button>
      </form>
    </main>
  );
}
