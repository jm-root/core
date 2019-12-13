const benchmark = require('benchmark')
const suite = new benchmark.Suite()

const enableErr = require('../').enableErr
var o = {}

suite
  .add('enableErr', () => {
    o = {}
    enableErr(o)
  })
  .add('errmsg, with params', () => {
    // eslint-disable-next-line
    o.errMsg('SUCCESS ${name}:${value}', { name: 'jeff', value: 123 })
  })
  .add('err, no params', () => {
    o.err(o.Err.SUCCESS)
  })
  .add('err, with params', () => {
    // eslint-disable-next-line
    o.err('SUCCESS ${name}:${value}', { name: 'jeff', value: 123 })
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
