const { Modulable } = require('jm-module')

const { moduleLogger, logger, getLogger } = require('../')

const v = ['debug', 'info', 'warn']
function log (logger) {
  logger.level = 'debug'
  for (const key of v) logger[key](key)
  logger.error(new Error('error test'))
}

log(logger)
log(getLogger('main'))

const m = new Modulable()
m.use(moduleLogger)

log(m.logger)
log(m.getLogger('main'))
