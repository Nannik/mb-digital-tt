import * as esbuild from 'esbuild'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'

const opts = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: 'build',
  plugins: [
    htmlPlugin({
      files: [{
        entryPoints: ['src/index.tsx'],
        filename: 'index.html',
        htmlTemplate: 'public/index.html',
      }]
    })
  ],
};

const mode = process.argv[2];
if (mode === 'serve') {
  const ctx = await esbuild.context(opts)
  ctx.serve({
    port: 3000,
    host: 'localhost',
    servedir: 'build'
  })
} else {
  esbuild.build(opts);
}
