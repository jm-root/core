const { arg2bool, arg2number } = require('../lib')

describe('argv', () => {
  test('arg2bool', function () {
    let v = [
      true,
      2,
      '1',
      '10',
      'true',
      '0.1'
    ]
    for (const item of v) {
      console.log(item, ':', arg2bool(item))
      expect(arg2bool(item)).toBeTruthy()
    }

    v = [
      false,
      null,
      undefined,
      0,
      'false',
      '0',
      'asdfs',
      [],
      {},
      ['112'],
      { a: 1 }
    ]
    for (const item of v) {
      console.log(item, ':', arg2bool(item))
      expect(!arg2bool(item)).toBeTruthy()
    }
  })

  test('arg2number', function () {
    let v = [
      0,
      '0',
      '1',
      '10',
      'true',
      '0.1',
      true,
      false,
      null,
      {},
      [],
      'sfsd'
    ]
    for (const item of v) {
      console.log(item, ':', arg2number(item))
      expect((typeof arg2number(item)) === 'number').toBeTruthy()
    }
  })
})
