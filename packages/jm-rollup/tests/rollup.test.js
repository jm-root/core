const $ = require('../lib')

describe('rollup', function () {
  it('config', function () {
    console.log($('../'))
    console.log($('../', {
      inputFilename: 'lib/browser',
      outputFilename: 'dist/browser'
    }))
  })
})
