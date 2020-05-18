# 事件 jm-event

事件触发与事件监听器, 实现了类似 Node.js 的 EventEmitter 的功能。

## 特性

1. 支持浏览器

1. 可以随时中断事件的传递

1. 支持异步 async

## 安装

```bash
npm i jm-event
```

## 使用

```javascript
const {enableEvent} = require('jm-event')

const obj = {}
enableEvent(obj) // 使对象 obj 拥有事件能力

obj.on('test', (opts, intro) => {
    console.info(opts, intro)
})

obj.emit('test', {name: 'jeff'}, 'test intro')
```

## enableEvent(obj, opts)

为对象增加事件支持。

参数 opts
- force  [false] 如果对象已经支持事件，是否强制覆盖
- async  [false] 是否采用异步方式发生事件
- clean [false] 是否关闭原有事件监听

## disableEvent

为对象清除事件支持。

## 类 EventEmitter

### 构造函数

参数 async [false] 是否采用异步方式发生事件

```javascript

// 可以直接使用
const {EventEmitter} = require('jm-event')
const obj = new EventEmitter({async: true})
```

```javascript
// 可以继承
class MyEventEmitter extends EventEmitter{
  constructor (){
    super({async: true})
  }
}
cosnt obj = new MyEventEmitter()
```

### on(eventName, fn, prepend)
     
为指定事件注册一个监听器。

参数 prepend [false] 是否添加到监听器列表的前部

```javascript
obj
    .on('test', (opts, intro) => {
        console.info(opts, intro)
    })
    .on('test2', async (opts, intro) => {
        console.info(opts, intro)
    })
```

### once(eventName, fn, prepend)

为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

```javascript
server.once('connection', function () {
  console.log('Ah, we have our first user!')
})
```

### off(eventName, fn)
    
移除指定事件的某个监听器。

如果未指定fn，则移除指定事件的所有监听器。

如果未指定事件，则移除所有监听器。

```javascript
const callback = function() {
  console.log('someone connected!')
}
server.on('connection', callback)
// ...
server.off('connection', callback)

obj
    .off('test') // 关闭 test 事件的监听
    .off() // 关闭所有事件监听
```

### emit(eventName, ...listeners)

发生事件, 按顺序执行每个监听器，如果某个监听器返回任何值, 就终端此过程, 其后续监听器不会继续被执行。

```javascript
obj.emit('test', {name: 'jeff'}, 'test intro')
```

### eventNames()

返回所有已监听事件数组。

### listeners(eventName)

返回指定事件的监听器数组。

## 注意事项

异步方式比同步方式慢10倍以上，对性能要求高的场景，慎用！


## 原理说明

```javascript
const event = require('jm-event');
const emitter = {};
event.enableEvent(emitter);
emitter.on('some_event', function() {
	console.log('some_event 事件触发');
});
setTimeout(function() {
	emitter.emit('some_event');
}, 1000);
```

执行结果如下：

运行这段代码，1 秒后控制台输出了 'some_event 事件触发'。 其原理是 event 对象注册了事件 some_event 的一个监听器，然后我们通过 setTimeout 在 1000 毫秒以后向 event 对象发送事件 some_event，此时会调用some_event 的监听器。

EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。

让我们以下面的例子解释这个过程：

```javascript
const event = require('jm-event');
const emitter = {};
event.enableEvent(emitter);
emitter.on('someEvent', function(arg1, arg2) {
	console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function(arg1, arg2) {
	console.log('listener2', arg1, arg2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
```

执行以上代码，运行的结果如下：

```bash
listener1 arg1 参数 arg2 参数
listener2 arg1 参数 arg2 参数
```

以上例子中，emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。

运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是EventEmitter最简单的用法。
