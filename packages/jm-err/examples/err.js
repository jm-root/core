const error = require('../')

function test (obj) {
  console.info(JSON.stringify(obj.Err, null, 2))
  // eslint-disable-next-line
  console.info(obj.errMsg('SUCCESS ${name}:${value}', { name: 'jeff', value: 123 }))
  console.info(obj.err(obj.Err.SUCCESS))
  console.info(obj.Err.t(obj.Err.SUCCESS.msg, 'zh_CN'))
  // eslint-disable-next-line
  console.info(obj.err('SUCCESS ${name}:${value}', { name: 'jeff', value: 123 }))
  console.info(obj.err(Object.assign(obj.Err.SUCCESS, { data2: { test: 1 } })))
}

var o = {}
error.enableErr(o)
test(o)
