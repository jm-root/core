const event = require('jm-event')

const PingTimeout = 60000 // 默认心跳时间 60 秒
const PongTimeout = 10000 // 默认响应超时时间 10 秒

class HeartBeat {
  constructor (opts = {}) {
    event.enableEvent(this)

    const { pingTimeout = PingTimeout, pongTimeout = PongTimeout } = opts

    this.pingTimeout = pingTimeout
    this.pongTimeout = pongTimeout
  }

  reset () {
    this.stop()
    this.start()
    return this
  }

  start () {
    const { pingTimeout, pongTimeout } = this
    this.pingTimer = setTimeout(() => {
      if (this.emit('heartBeat')) {
        this.pongTimer = setTimeout(() => {
          this.emit('heartDead')
        }, pongTimeout)
      }
    }, pingTimeout)
    return this
  }

  stop () {
    this.pingTimer && clearTimeout(this.pingTimer)
    this.pongTimer && clearTimeout(this.pongTimer)
    return this
  }
}

HeartBeat.PingTimeout = PingTimeout
HeartBeat.PongTimeout = PongTimeout

module.exports = HeartBeat
