import { build, context } from 'esbuild';
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';

const serve = process.argv.includes('--serve');
const OUT = 'dist';

const opts = {
  entryPoints: { app: 'src/main.jsx' },
  bundle: true,
  outdir: `${OUT}/assets`,
  jsx: 'automatic',
  format: 'esm',
  minify: !serve,
  sourcemap: serve,
  target: ['es2020', 'safari15'],
  define: {
    'process.env.NODE_ENV': serve ? '"development"' : '"production"',
    __DEV__: serve ? 'true' : 'false',
  },
  logLevel: 'info',
};

function walk(dir, base = dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p, base) : [p.slice(base.length + 1)];
  });
}

function assemble() {
  const js = readFileSync(`${OUT}/assets/app.js`);
  const css = readFileSync(`${OUT}/assets/app.css`);
  const v = createHash('sha1').update(js).update(css).digest('hex').slice(0, 10);
  writeFileSync(`${OUT}/index.html`, readFileSync('index.html', 'utf8').replaceAll('__V__', v));
  const files = ['./', ...walk(OUT).filter((f) => !f.endsWith('.map') && f !== 'sw.js').map((f) => `./${f}`)];
  const sw = readFileSync('public/sw.js', 'utf8').replace('__V__', v).replace('__FILES__', JSON.stringify(files));
  writeFileSync(`${OUT}/sw.js`, sw);
  writeFileSync(`${OUT}/.nojekyll`, '');
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('public', OUT, { recursive: true });

if (!serve) {
  await build(opts);
  assemble();
  console.log('Built to dist/');
} else {
  const ctx = await context({
    ...opts,
    plugins: [{ name: 'assemble', setup: (b) => b.onEnd(() => assemble()) }],
  });
  await ctx.watch();
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json' };
  createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const data = readFileSync(join(OUT, p));
      res.writeHead(200, { 'Content-Type': types[extname(p)] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }).listen(5173, () => console.log('Dev server: http://localhost:5173'));
}
