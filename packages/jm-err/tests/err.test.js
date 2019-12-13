const error = require('../lib')
const { Err, enableErr, disableErr } = error

let o = {}

describe('err', function () {
  it('enableErr', function () {
    expect(enableErr(o)).toBeTruthy()
    expect(enableErr(o)).not.toBeTruthy()
  })

  it('errMsg', function () {
    // eslint-disable-next-line
    let msg = error.errMsg('err param: ${param} paramNum: ${num}', {
      param: 'abc',
      num: 123
    })
    expect(msg === 'err param: abc paramNum: 123').toBeTruthy()
  })

  it('err', function () {
    let E = Err['SUCCESS']
    let e = error.err(E)
    expect(e.message === E.msg).toBeTruthy()

    // eslint-disable-next-line
    e = error.err('err param: ${param} paramNum: ${num}', {
      param: 'abc',
      num: 123
    })
    expect(e.message === 'err param: abc paramNum: 123').toBeTruthy()
  })

  it('t', function () {
    let msg = Err.t(Err.FAIL.msg, 'zh_CN')
    console.log(msg)
    expect(msg).toBeTruthy()
  })

  it('disableErr', function () {
    enableErr(o)
    disableErr(o)
    expect(!o.Err).toBeTruthy()
  })
})
