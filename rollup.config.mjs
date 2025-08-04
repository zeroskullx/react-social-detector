import { readFileSync } from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

// External dependencies that should not be bundled
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  'react/jsx-runtime',
  'react',
  'react-dom'
];

const commonConfig = {
  input: `src/${pkg.name}/index.ts`,
  external,
};

const commonPlugins = [
  nodeResolve({
    browser: false,
    preferBuiltins: true,
  }),
  commonjs(),
  json(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false,
    sourceMap: true,
    jsx: 'react-jsx',
    include: ['src/**/*'],
    exclude: ['**/*.test.*', '**/*.spec.*'],
  }),
];

export default [
  // ESM build (modern)
  {
    ...commonConfig,
    output: {
      file: 'dist/index.esm.mjs',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      ...commonPlugins,
      terser({
        format: {
          comments: false,
        },
        compress: {
          drop_console: false, // Keep console for debugging
          drop_debugger: true,
        },
      }),
    ],
  },

  // CommonJS build (compatibility)
  {
    ...commonConfig,
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto',
    },
    plugins: [
      ...commonPlugins,
      terser({
        format: {
          comments: false,
        },
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }),
    ],
  },

  // Type definitions
  {
    input: `src/${pkg.name}/index.ts`,
    output: {
      file: pkg.types,
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          removeComments: false,
        },
      }),
    ],
  },
];
