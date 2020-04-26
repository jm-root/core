const { join } = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = function (cwd) {
  const input = join(cwd, 'lib/index.js')
  const output = [
    {
      format: 'es',
      sourcemap: true,
      file: join(cwd, 'dist/index.esm.js')
    },
    {
      format: 'cjs',
      sourcemap: true,
      file: join(cwd, 'dist/index.js')
    }
  ]
  const plugins = [
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        ['@babel/preset-env', {
          modules: false
        }]
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
        'babel-plugin-transform-async-to-promises'
      ]
    })
  ]
  return {
    input,
    output,
    plugins
  }
}
