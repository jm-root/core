const { Modulable, enableModule } = require('../')

// define a modulabe named 'test'
const mdlTest = function (opts) {
  console.log(opts)
  const app = this
  app.test = function () {
    return true
  }

  return {
    name: 'test',
    unuse: function () {
      delete app.test
    }
  }
}

function test (obj) {
  obj.use(mdlTest, { name: 'jeff', age: 18 })
  console.log('test: %j', obj.test())
  obj.unuse('test')
}

const m = new Modulable()
test(m)

const o = {}
enableModule(o)
test(o)
