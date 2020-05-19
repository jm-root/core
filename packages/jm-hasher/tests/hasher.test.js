const { md5, sha256, sm3 } = require('../')

describe('hasher', () => {
  test('md5', async () => {
    expect(md5('123')).toBe('202cb962ac59075b964b07152d234b70')
  })

  test('sha256', async () => {
    expect(sha256('123')).toBe('a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3')
  })

  test('sm3', async () => {
    expect(sm3('123')).toBe('6e0f9e14344c5406a0cf5a3b4dfb665f87f4a771a31f7edbb5c72874a32b2957')
  })
})
