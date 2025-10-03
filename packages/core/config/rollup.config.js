import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import { copyFileSync } from 'fs';

// Custom plugin to copy TypeScript declaration files
const copyTypes = () => ({
  name: 'copy-types',
  writeBundle() {
    copyFileSync('src/index.d.ts', 'dist/index.d.ts');
  }
});

export default defineConfig([
  // ES Module build
  {
    input: 'src/index.js',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      postcss({
        extract: false, // Inject CSS into JS for components
        minimize: true,
        inject: true, // Inject CSS into JS
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      copyTypes(), // Copy TypeScript declaration files
    ],
    external: ['react', 'react-dom'], // Don't bundle peer dependencies
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      postcss({
        extract: 'index.css',
        minimize: true,
        inject: false,
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
    external: ['react', 'react-dom'],
  },
  // UMD build for browsers
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'LSCore',
      sourcemap: true,
    },
    plugins: [
      postcss({
        extract: false, // Inject CSS for UMD
        inject: true,
        minimize: true,
      }),
      nodeResolve({
        preferBuiltins: false,
      }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      terser(), // Minify for UMD
    ],
  },
  ]);
