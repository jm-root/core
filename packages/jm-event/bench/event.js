'use strict'

const benchmark = require('benchmark')
const event = require('../')

var o = {}
event.enableEvent(o)

var countTest1 = 0
var countTest2 = 0
var countTest3 = 0
o
  .on('test1', function () {
    countTest1++
  })
  .on('test2', function () {
    countTest2++
  })
  .on('test2', function () {
    countTest2++
  })
  .on('test3', function () {
    countTest3++
  })
  .on('test3', function () {
    countTest3++
  })
  .on('test3', function () {
    countTest3++
  })

const suite = new benchmark.Suite()

suite
  .add('emit, no listener', () => {
    o.emit('test', {})
  })
  .add('emit, 1 listener', () => {
    o.emit('test1', {})
  })
  .add('emit, 2 listeners', () => {
    o.emit('test2', {})
  })
  .add('emit, 3 listeners', () => {
    o.emit('test3', {})
  })
  .add('on and off', () => {
    o.on('test', function () {
    })
    o.off('test')
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
    console.log('count t1:%s t2:%s t3:%s ', countTest1, countTest2, countTest3)
  })

if (require.main === module) {
  suite.run({ async: true })
} else {
  module.exports = suite
}
