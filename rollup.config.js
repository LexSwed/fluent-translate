import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

const sources = ['popup'];

export default () => {
  return sources.map(source => ({
    input: `src/${source}`,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      file: `build/${source}/script.js`
    },
    plugins: [
      svelte({
        dev: !production,
        css: css => {
          css.write(`build/${source}/style.css`);
        }
      }),
      del({
        targets: ['build/**/!(*.html)'],
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
      !production && livereload('build'),
      production && terser(),
      replace({ __buildEnv__: JSON.stringify(production ? 'production' : 'development') })
    ]
  }));
};
