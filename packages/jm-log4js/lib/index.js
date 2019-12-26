const log4js = require('log4js')

const getLogger = (loggerCategoryName) => {
  const log = log4js.getLogger(loggerCategoryName)
  log.setLevel || (log.setLevel = function (level) { this.level = level })
  return log
}
const logger = getLogger()

const moduleLogger = function (name = 'logger') {
  const obj = this
  const old = {
    getLogger: obj.getLogger,
    logger: obj.logger
  }

  Object.assign(obj, { getLogger, logger })

  return {
    name,
    unuse: function () {
      Object.assign(obj, old)
    }
  }
}

const $ = {
  logger: getLogger(),
  getLogger,
  moduleLogger
}

module.exports = $
