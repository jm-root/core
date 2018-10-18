const event = require('jm-event')
const {logger} = require('jm-logger')
const WebSocket = require('ws')

module.exports = class Adapter {
  constructor (uri) {
    event.enableEvent(this)

    const ws = new WebSocket(uri)

    ws.on('message', opts => {
      this.emit('message', opts)
    })
    ws.onopen = opts => {
      this.emit('open', opts)
    }
    ws.onerror = opts => {
      this.emit('error', opts)
    }
    ws.onclose = opts => {
      this.emit('close', opts)
    }

    this.ws = ws

  }

  send () {
    this.ws.send(...arguments)
  }

  close () {
    if (!this.ws) return
    this.ws.close(...arguments)
    this.ws = null
  }
}
