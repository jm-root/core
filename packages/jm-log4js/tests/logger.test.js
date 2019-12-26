const { Modulable } = require('jm-module')
const { moduleLogger, logger, getLogger } = require('../lib')

const v = ['debug', 'info', 'warn', 'error']
function log (logger) {
  logger.level = 'debug'
  for (const key of v) logger[key](key)
}

describe('logger', function () {
  it('logger and getLogger', function () {
    log(getLogger('main'))
    log(logger)
  })

  it('moduleLogger', function () {
    const obj = new Modulable()
      .use(moduleLogger)

    expect(obj.logger).toBeTruthy()
    expect(getLogger).toBeTruthy()

    log(obj.getLogger('main'))
    log(obj.logger)

    obj.unuse('logger')
  })
})
