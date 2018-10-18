(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var HeartBeat = require('./heartbeat');

  var WebSocket = require('./ws');

  var $ = {
    HeartBeat: HeartBeat,
    WebSocket: WebSocket
  };
  module.exports = $;

})));
//# sourceMappingURL=jm-net.js.map
