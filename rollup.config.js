import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'cornerstone-core': 'cornerstone',
        'cornerstone-tools': 'cornerstoneTools',
        'cornerstone-math': 'cornerstoneMath',
        'dicom-parser': 'dicomParser'
      },
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'OHIF',
      sourcemap: true,
      exports: 'named',
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'cornerstone-core': 'cornerstone',
        'cornerstone-tools': 'cornerstoneTools',
        'cornerstone-math': 'cornerstoneMath',
        'dicom-parser': 'dicomParser'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named'
    },
  ],
  plugins: [
    external(),
    postcss({
      modules: false
    }),
    url(),
    svgr(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ '@babel/external-helpers' ],
      externalHelpers: false
    }),
    resolve(),
    commonjs()
  ],
  external: ['cornerstone-core', 'cornerstone-math', 'cornerstone-tools', 'cornerstone-wado-image-loader', 'dicom-parser', 'hammerjs']
}
