const event = require('../')

var o = {}
event.enableEvent(o)

o.on('test', function (opts, intro) {
  console.info('%j %j', opts, intro)
})

o.emit('test', { name: 'jeff' }, 'test intro')
