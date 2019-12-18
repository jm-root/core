const { utils } = require('../lib')

const o = {
  name: 'jeff'
}
let a = [1, 2, 3, 4]
a = utils.slice(a, 2)
console.log(utils.formatJSON(o))
console.log(utils.formatJSON(a))

console.log(utils.formatJSON(o))

console.log(utils.getUriProtocol('http://test.com'))
console.log(utils.getUriPath('http://test.com/abc/123/?acd=123'))
