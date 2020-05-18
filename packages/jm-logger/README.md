# 日志 jm-logger

基于控制台 console 封装的简单控制台日志。

## 特性

1. 支持浏览器
1. 支持日志级别
1. 支持日志分类


## install

```bash
npm i jm-logger
```

## 使用

```javascript
const {logger, getLogger} = require('jm-logger')
//默认日志
logger.info('logger test')

//分类日志
getLogger('main').info('logger test')
```

## 日志级别

- debug 调试
- info 信息
- warn 警告
- error 错误

```javascript
const {logger} = require('jm-logger')
logger.level = 'warn' // 设置日志输出级别

logger.info('这行不打印，日志级别不够')
logger.warn('这行可以打印')
```