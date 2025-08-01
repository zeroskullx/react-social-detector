import { readFileSync } from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
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
  input: 'src/react-social-detector/index.ts',
  external,
};

const commonPlugins = [
  nodeResolve({
    browser: false,
    preferBuiltins: true,
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false,
    sourceMap: true,
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
    input: 'src/react-social-detector/index.ts',
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
