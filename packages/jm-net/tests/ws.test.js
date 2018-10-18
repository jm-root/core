const {WebSocket} = require('../lib')
const Adapter = require('./ws')
const {logger} = require('jm-logger')

const reconnectTimeout = 1000
const reconnectAttempts = 0
const pingTimeout = 500
const pongTimeout = 500

const ws = new WebSocket({Adapter, reconnectTimeout, reconnectAttempts, pingTimeout, pongTimeout})
const uri = 'http://gateway.test.jamma.cn'

ws
  .on('open', () => {
    logger.debug('opened')
  })
  .on('close', opts => {
    logger.debug('closed', opts.code, opts.reason)
  })
  .on('error', opts => {
    // logger.debug('error', opts.error)
  })
  .on('heartBeat', () => {
    logger.debug('heartBeat')
  })
  .on('connect', () => {
    logger.debug('connecting...')
  })
  .on('reconnect', () => {
    logger.debug('reconnect', `${ws.reconnectAttempts}/${ws.maxReconnectAttempts}`)
  })
  .on('connectFail', () => {
    logger.debug('connectFail')
  })
  .on('message', opts => {
    logger.debug('received', opts)
  })

test('opts', async () => {
  let o = new WebSocket({Adapter})
  expect(o.reconnectTimeout === WebSocket.ReconnectTimeout).toBeTruthy()
  expect(o.maxReconnectAttempts === WebSocket.MaxReconnectAttempts).toBeTruthy()

  o = ws
  expect(o.reconnectTimeout === reconnectTimeout).toBeTruthy()
  expect(o.maxReconnectAttempts === reconnectAttempts).toBeTruthy()

})

test('connect and close', async () => {
  await ws.connect(uri)
  expect(ws.ready).toBeTruthy()
  ws.close()
  expect(!ws.ready).toBeTruthy()
})

test('heartBeat fail', async () => {
  await ws.connect(uri)
  return new Promise((reslove, reject) => {
    let times = 0
    ws
      .off('heartBeat')
      .on('heartBeat', () => {
        logger.debug('heartBeat')
        return true
      })
      .on('close', () => {
        times++
        if (times === 2) {
          reslove()
          ws
            .off('heartBeat')
            .close()
        }
      })
  })
})

test('send', async () => {
  try {
    await ws.connect(uri)
    ws.send('ping')
  } catch (e) {
  }
})
