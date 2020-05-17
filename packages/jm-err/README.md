English | [简体中文](./README.zh-CN.md) 

# jm-err

define error info as JSON format.
 
used for return json format info on RESTful api.

## define an Err

```javascript
const Err = {
    SUCCESS: {
        err: 0, // unique code, integer
        status: 500, // status， integer
        msg: 'Success', // message, string
        ... // else info
    },
    ...
}
```

status: Http status

if status is not defined, status = err when err is Http status value, otherwise 500.

## install

```bash
npm i jm-err
```

## usage

use Err:
```javascript
const {Err} = require('jm-err')

console.log(Err.FAIL)

```

throw an error.
```javascript
const {Err, err} = require('jm-err')

throw err(Err.FAIL)

throw err('string as param')

// define a new Err
throw err({
  err: 222,
  msg: 'main msg',
  else: 'msg else'
})

// e.data == Err.FA_NOAUTH
const e = err(Err.FA_NOAUTH)
const {
  code,
  status, 
  message,
  data
} = e

```
output error info：
```bash
Error: Fail
    at err (E:\jamma\core\packages\jm-err\lib\index.js:150:13)
    ...
  code: 1,
  status: 500,
  data: { err: 1, msg: 'Fail', status: 500 }
}
```

template message support

```javascript
const {err} = require('jm-err')
const e = err('err param: ${param} paramNum: ${num}', {
  param: 'abc',
  num: 123
})
console.log(e.message)
//print 'err param: abc paramNum: 123'

// define template in Err
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
// print 'err param: abc paramNum: 123'
```

## i18n
```javascript
const {Err:{FAIL:{msg}}, t} = require('jm-err')
console.log(msg)
// 输出 'Fail'
console.log(t(msg, 'zh-CN'))
console.log(msg)
// 输出 '失败'
```
## defined Errs

| name      | err      | status      | msg  |
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

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Use jm-err in your daily work.
- Submit [issues](https://github.com/jm-root/core/issues) to report bugs or ask questions.
- Propose [pull requests](https://github.com/jm-root/core/pulls) to improve our code.
