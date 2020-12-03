import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

const sharePlugins = [
  resolve({
    preferBuiltins: true,
    extensions: ['.mjs', '.js', '.jsx', '.json', '.node', '.ts', '.tsx'],
  }),
  json(),
  commonjs({
    include: /node_modules/,
    requireReturnsDefault: 'preferred',
  }),
  babel({
    // presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
    // plugins: ['@babel/plugin-transform-runtime'],
    sourceMaps: 'both',
    babelHelpers: 'runtime',
    extensions: ['.ts', '.tsx'],
    exclude: /node_modules/,
  }),
  replace({
    'process.env.NODE_ENV': `"production"`,
    'process.env': '({})',
  }),
  replace({
    '(!!module).hot': 'false',
    delimiters: ['', ''],
  }),
  replace({
    [`var importedWrapper = require('react-imported-component/wrapper');`]: `import importedWrapper  from 'react-imported-component/wrapper';`,
    delimiters: ['', ''],
  }),
].filter(Boolean)

export default [
  {
    input: {
      index: 'src/entries/client.tsx',
    },
    treeshake: { moduleSideEffects: false },
    preserveEntrySignatures: 'strict',
    output: { dir: 'dist/browser', format: 'es', sourcemap: true },
    plugins: [
      alias({
        entries: {
          react: `preact/compat`,
          'react-dom': `preact/compat`,
        },
      }),
      ...sharePlugins,
      replace({
        'process.env.NODE_ENV': `"production"`,
        'process.env': '({})',
      }),
    ],
  },
  {
    input: {
      // server: 'src/server.tsx',
      server: 'src/entries/server.ts',
    },
    treeshake: true,
    preserveEntrySignatures: 'strict',
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
    },
    external: [
      'react',
      'react-dom',
      'preact-render-to-string',
      // 'preact/compat'
      // 'react-imported-component',
      // 'react-imported-component/wrapper',
    ],
    plugins: [
      alias({
        entries: {
          react: `preact/compat`,
          'react-dom': `preact/compat`,
        },
      }),
      ...sharePlugins,
    ],
  },
]
