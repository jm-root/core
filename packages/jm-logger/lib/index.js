const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
}

function none () {}

class Logger {
  constructor (opts = {}) {
    this.level = opts.level || 'debug'
    this.category = opts.category || 'default'
  }

  set level (level) {
    level || (level = 'debug')
    this._levelName = level.toLocaleLowerCase()
    this._level = levels[this._levelName]

    Object.keys(levels)
      .forEach(level => {
        if (this._level < levels[level]) {
          this[level] = none
        } else {
          if (level === 'debug') {
            this[level] = console.log
          } else {
            this[level] = console[level]
          }
        }
      })
  }

  get level () {
    return this._levelName
  }

  get levelValue () {
    return this._level
  }
}

let loggers = {}

let getLogger = (loggerCategoryName = 'default') => {
  if (!loggers[loggerCategoryName]) {
    loggers[loggerCategoryName] = new Logger({category: loggerCategoryName})
  }
  return loggers[loggerCategoryName]
}

let moduleLogger = function (name = 'logger') {
  let obj = this
  obj.getLogger = getLogger
  obj.logger = getLogger()
  return {
    name: name,
    unuse: function () {
      delete obj.logger
      delete obj.getLogger
    }
  }
}

let $ = {
  logger: getLogger(),
  getLogger: getLogger,
  moduleLogger: moduleLogger
}

module.exports = $
