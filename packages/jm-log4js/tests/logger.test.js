const { Modulable } = require('jm-module')
const mdl = require('../lib')

const v = ['debug', 'info', 'warn', 'error']
function log (logger) {
  logger.level = 'debug'
  for (const key of v) logger[key](key)
}

describe('logger', function () {
  let jm = new Modulable().use(mdl)

  it('jm.logger', function () {
    expect(jm.logger).toBeTruthy()
    expect(mdl).toBeTruthy()
    log(jm.logger)
  })

  it('jm.getLogger', function () {
    expect(jm.getLogger).toBeTruthy()
    let logger = jm.getLogger('main')
    expect(logger).toBeTruthy()
    log(logger)
  })
})
