const log4js = require('log4js')

function plus (log) {
  if (log.setLevel) return
  log.setLevel = function (level) { this.level = level }
}

const getLogger = (loggerCategoryName) => {
  const log = log4js.getLogger(loggerCategoryName)
  plus(log)
  return log
}
const logger = getLogger()
plus(logger)

const $ = function () {
  const obj = this
  const old = {
    getLogger: obj.getLogger,
    logger: obj.logger
  }

  Object.assign(obj, { getLogger, logger })

  return {
    name: 'jm-log4js',
    unuse: function () {
      Object.assign(obj, old)
    }
  }
}

$.getLogger = getLogger
$.logger = logger

module.exports = $
