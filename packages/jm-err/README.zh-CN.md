[English](./README.md) | 简体中文

# jm-err

基于JSON格式的常用错误定义。

适用于RESTful接口返回异常时，附加JSON格式的内容。

## 错误定义

Err 预定义了常用的错误，格式如下。

```javascript
const Err = {
    SUCCESS: {
        err: 0, // 代码, 唯一, integer类型，可选
        status: 500, // 状态码， integer类型，可选
        msg: 'Success', // 信息, string类型，可选
        ... // 其他信息
    },
    ...
}
```

status 要符合 Http 协议的状态码标准。

status 未定义时，如果 err 符合 Http 协议的状态码标准, 则采用 err 作为 status 值，否则默认 500。

## 安装

```bash
npm i jm-err
```

## 使用

使用预定义的错误对象:
```javascript
const {Err} = require('jm-err')

console.log(Err.FAIL)

```

抛出异常，附加JSON格式的信息
```javascript
const {Err, err} = require('jm-err')

// 抛出异常
throw err(Err.FAIL)

// 直接用字符串
throw err('也可以已字符串作为参数')

// 自定义Err
throw err({
  err: 222,
  msg: '自定义',
  else: '其他信息'
})

// e.data 为附加信息
const e = err(Err.FA_NOAUTH)
const {
  code, // 代码
  status, // 状态码
  message, // 信息
  data // JSON格式的信息
} = e

```
此时抛出异常格式为：
```bash
Error: Fail // 错误信息
    at err (E:\jamma\core\packages\jm-err\lib\index.js:150:13)
    ...
  code: 1, // 代码
  status: 500, // 状态码
  data: { err: 1, msg: 'Fail', status: 500 }
}
```

支持模板消息

```javascript
const {err} = require('jm-err')
const e = err('err param: ${param} paramNum: ${num}', {
  param: 'abc',
  num: 123
})
console.log(e.message)
//输出 'err param: abc paramNum: 123'

// 也可以在Err对象中定义模板
const ErrSample = {
  err: 1,
  status: 500,
  msg: 'err param: ${param} paramNum: ${num}'
}
const e2 = err(ErrSample, {
  param: 'abc',
  num: 123
})
console.log(e2.message)
// 输出 'err param: abc paramNum: 123'
```

## 多语言
```javascript
const {Err:{FAIL:{msg}}, t} = require('jm-err')
console.log(msg)
// 输出 'Fail'
console.log(t(msg, 'zh-CN'))
console.log(msg)
// 输出 '失败'
```
## 预定义的错误对照表

| 名称      | 代码      | 状态码      | 信息  |
| ----- |:-------------:| :-----:| :-----|
|SUCCESS|0|200|Success|
|FAIL|1| |Fail|
|FA_SYS|2| |System Error|
|FA_NETWORK|3| |Network Error|
|FA_PARAMS|4| |Parameter Error|
|FA_BUSY|5| |Busy|
|FA_TIMEOUT|6| |Time Out|
|FA_ABORT|7| |Abort|
|FA_NOTREADY|8| |Not Ready|
|FA_NOTEXISTS|9| |Not Exists|
|FA_EXISTS|10| |Already Exists|
|FA_VALIDATION|11| |Validation Error|
|OK|200| |OK|
|FA_BADREQUEST|400| |Bad Request|
|FA_NOAUTH|401| |Unauthorized|
|FA_NOPERMISSION|403| |Forbidden|
|FA_NOTFOUND|404| |Not Found|
|FA_INTERNALERROR|500| |Internal Server Error|
|FA_UNAVAILABLE|503| |Service Unavailable|

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建：

- 在你的公司或个人项目中使用 jm-err。
- 通过 [Issue](https://github.com/jm-root/core/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/jm-root/core/pulls) 改进代码。
