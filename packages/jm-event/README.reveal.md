---
theme : "white"
---

# jm-event

### 事件

<small>作者：[鱼哥](https://github.com/jammacn)</small>

---

## install

```bash
npm i jm-event
```

---

## use:

```
const event = require('jm-event')

let o = {}
event.enableEvent(o)

o.on('test', (opts, intro) => {
    console.info(opts, intro)
})

o.emit('test', {name: 'jeff'}, 'test intro')
```

---

## 类 EventEmitter

--

### 构造函数

参数 async [false] 是否采用异步方式发生事件
```
const event = require('jm-event')
let o = new event.EventEmitter({async: true})
```

--

### on


```
o
    .on('test', (opts, intro) => {
        console.info(opts, intro)
    })
    .on('test2', async (opts, intro) => {
        console.info(opts, intro)
    })
```

--

### off

```
o.off('test')

o.off() // 清除所有监听
```

--

### emit

```
o.emit('test', {name: 'jeff'}, 'test intro')
```

---

## 为对象增加事件支持 enableEvent

enableEvent(obj, opts)

参数 opts
- force
- async
- clean

---

## 为对象清除事件支持 disableEvent

---

## 已知问题

- 异步方式比同步方式慢10倍以上
