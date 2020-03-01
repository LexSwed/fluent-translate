import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

const sources = ['popup'];

export default () => {
  return sources.map(source => ({
    input: `src/${source}`,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: `${source}/script.js`
    },
    plugins: [
      svelte({
        dev: !production,
        css: css => {
          css.write(`${source}/style.css`);
        }
      }),
      del({
        targets: sources.map(() => `${source}/*.{js,css}`),
        verbose: !production,
        runOnce: !production
      }),

      // If you have external dependencies installed from
      // npm, you'll most likely need these plugins. In
      // some cases you'll need additional configuration -
      // consult the documentation for details:
      // https://github.com/rollup/plugins/tree/master/packages/commonjs
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      !production && serve(source),
      !production && livereload(source),
      production && terser()
    ]
  }));
};

function serve(source) {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'serve', '--', source, '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  };
}
