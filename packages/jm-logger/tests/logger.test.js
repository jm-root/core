const log = require('../lib')

let l = function (logger) {
  const levels = ['debug', 'info', 'warn', 'error']
  expect(logger).toBeTruthy()
  logger.level = 'info'
  console.log(log.logger)
  levels
    .forEach(function (level) {
      logger[level](level)
      expect(logger[level]).toBeTruthy()
    })
}

test('logger', () => {
  l(log.logger)
})

test('getLogger', () => {
  l(log.getLogger('main'))
})
