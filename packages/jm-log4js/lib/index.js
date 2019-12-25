const log4js = require('log4js')
const getLogger = (loggerCategoryName) => {
  return log4js.getLogger(loggerCategoryName)
}
const logger = getLogger()

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
