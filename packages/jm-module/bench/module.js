const benchmark = require('benchmark')
const suite = new benchmark.Suite()
const mdl = require('../lib')

const mdlTest = function () {
  const app = this
  app.test = function () {}

  return {
    name: 'test',
    unuse: function () {
      delete app.test
    }
  }
}

suite
  .add('enableModule', () => {
    const obj = {}
    mdl.enableModule(obj)
  })
  .add('use', () => {
    const obj = {}
    mdl.enableModule(obj)
    obj.use(mdlTest)
  })
  .add('unuse', () => {
    const obj = {}
    mdl.enableModule(obj)
    obj.use(mdlTest)
    obj.unuse('test')
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
