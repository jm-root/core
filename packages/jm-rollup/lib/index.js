const { join } = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')

module.exports = function (cwd, opts = {}) {
  const { inputFilename = 'lib/index', outputFilename = `dist/index` } = opts
  const input = join(cwd, `${inputFilename}`)
  const output = [
    {
      format: 'es',
      sourcemap: true,
      file: join(cwd, `${outputFilename}.esm.js`)
    },
    {
      format: 'cjs',
      sourcemap: true,
      file: join(cwd, `${outputFilename}.js`)
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
