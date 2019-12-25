const { Modulable } = require('jm-module')

const mdl = require('../')

const v = ['debug', 'info', 'warn']
function log (logger) {
  logger.level = 'debug'
  for (const key of v) logger[key](key)
  logger.error(new Error('error test'))
}

log(mdl.logger)
log(mdl.getLogger('main'))

const m = new Modulable()
m.use(mdl)

log(m.logger)
log(m.getLogger('main'))
