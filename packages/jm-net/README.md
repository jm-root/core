---
theme : "white"
---

# jm-net

### 网络工具库

<small>作者：[鱼哥](https://github.com/jammacn)</small>

---

## install

```
npm i jm-net
```

---

## use:

```
const {HeartBeat, WebSocket} = require('jm-net')

```

---

## 类 HeartBeat

心跳

---

### 构造函数

- 参数 pingTimeout [60000] 心跳周期，默认 60 秒，产生 heartBeat 事件
- 参数 pongTimeout [10000] 心跳响应超时，默认 10 秒，超时后，产生 heartDead 事件
```
const {HeartBeat} = require('jm-net')
const heart = new HeartBeat()
```

--

### start

启动心跳检测

--

### stop

停止心跳检测

--

### reset

先 stop , 后 start

---

### 事件

- heartBeat

事件处理函数中，必须返回 true, 否则心跳功能被忽略

```
heart.on('heartBeat', ()=>{
    ...
    return true
})
```

- heartDead

---

### 心跳流程

1. 启动心跳 start
1. pingTimeout 后产生 heartBeat 事件
1. 监听和处理 heartBeat 事件, 并且返回 true
1. pongTimeout 时间内复位 reset, 完成正常心跳, 返回步骤1，进入下一次心跳
1. 如果 pongTimeout 后, 未调用复位，表示 心跳超时，产生 heartDead 事件，心跳异常结束

---


## 类 WebSocket

WebSocket 通用封装，支持心跳检测和断线重连

---

### 构造函数

- 参数 Adapter 适配器，必须
- 参数 reconnect [true] 是否开启断线重连
- 参数 reconnectTimeout [3000] 断线重连间隔时间
- 参数 reconnectAttempts [0] 重连尝试次数，默认0表示不限制，不为0时，超过次数后停止重连，并产生 connectFail 事件
- 参数 pingFailedCode [4999] 心跳超时，关闭连接的代码, on('close', event=>{event.code===4999})
- 参数 pingTimeout [60000] 心跳周期，默认 60 秒，产生 heartBeat 事件
- 参数 pongTimeout [10000] 心跳响应超时，默认 10 秒，超时后，产生 heartDead 事件
```
const {WebSocket} = require('jm-net')
const ws = new WebSocket()
```

--

### Adapter

适配器类, 必须实现 send, close 方法，及事件 open, close, error, message

```
const event = require('jm-event')
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
```

--

### connect(uri)

连接服务器, 产生 connect 事件

- 参数 uir 首次调用必填, 之后可选

--

### close

关闭连接

--

### send

发送消息

---

### 事件

- open

- close

- error

- message

- heartBeat

- heartDead

- connect

- reconnect

- connectFail

---
