# 模块 jm-module

在开发一些通用场合的应用时，为了方便扩展, 经常采用了模块化(插件式)设计理念。

jm-module 正为此而生, 一切皆模块!

## 特性

1. 支持浏览器
1. 支持模块动态加载和卸载

## 安装

```bash
npm i jm-module
```

## 模块的定义

```javascript
module.exports = function (name) {
    const $ = this
    $[name] = {
        toString: function () {
            return 'this is a module'
        }
    }
    return {
        name,
        unuse: function () {
            delete $[name]
        }
    }
}
```

## 模块的加载、使用和卸载

```javascript
const {enableModule} = require('jm-module')
const module1 = require('./module1')

const root = {}
enableModule(root)

//加载
root.use(module1)

// 使用加载的模块
root.module1.toString()

//卸载
root.unuse ('module1')

```
