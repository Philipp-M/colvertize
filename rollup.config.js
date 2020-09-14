import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const input = 'src/index.ts';
export default [
  {
    input,
    output: {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions: ['.ts', '.mjs', '.js', '.json', '.node'] }),
      typescript({ useTsconfigDeclarationDir: true }),
      commonjs(),
      production && terser(), // minify in production
    ],
  },
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [typescript({ useTsconfigDeclarationDir: true })],
  },
];
