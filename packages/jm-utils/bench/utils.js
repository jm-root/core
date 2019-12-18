'use strict'

const benchmark = require('benchmark')
const { utils } = require('../lib')
const a = [1, 2, 3]

const suite = new benchmark.Suite()

suite
  .add('Array.prototype.slice', () => {
    a.slice(2)
  })
  .add('utils.slice', () => {
    utils.slice(a, 2)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

if (require.main === module) {
  suite.run({ async: true })
} else {
  module.exports = suite
}
