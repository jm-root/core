import jmEvent from 'jm-event';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var PingTimeout = 30000; // 默认心跳时间 30 秒

var PongTimeout = 5000; // 默认响应超时时间 5 秒

var HeartBeat = /*#__PURE__*/function () {
  function HeartBeat() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, HeartBeat);

    jmEvent.enableEvent(this);
    var _opts$pingTimeout = opts.pingTimeout,
        pingTimeout = _opts$pingTimeout === void 0 ? PingTimeout : _opts$pingTimeout,
        _opts$pongTimeout = opts.pongTimeout,
        pongTimeout = _opts$pongTimeout === void 0 ? PongTimeout : _opts$pongTimeout;
    this.pingTimeout = pingTimeout;
    this.pongTimeout = pongTimeout;
  }

  _createClass(HeartBeat, [{
    key: "reset",
    value: function reset() {
      this.stop();
      this.start();
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var pingTimeout = this.pingTimeout,
          pongTimeout = this.pongTimeout;
      this.pingTimer = setTimeout(function () {
        if (_this.emit('heartBeat')) {
          _this.pongTimer = setTimeout(function () {
            _this.emit('heartDead');
          }, pongTimeout);
        } else {
          console.warn('heartBeat event was not be correctly handled. heart beat is disabled');
        }
      }, pingTimeout);
      return this;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.pingTimer && clearTimeout(this.pingTimer);
      this.pongTimer && clearTimeout(this.pongTimer);
      return this;
    }
  }]);

  return HeartBeat;
}();

HeartBeat.PingTimeout = PingTimeout;
HeartBeat.PongTimeout = PongTimeout;
var heartbeat = HeartBeat;

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var PingFailedCode = 4999; // 心跳失败后，关闭 code, 4000 至 4999 之间

var MaxReconnectAttempts = 0; // 默认重试次数0 表示无限制

var ReconnectTimeout = 3000; // 默认自动重连延时 3 秒

var WebSocket = /*#__PURE__*/function () {
  function WebSocket() {
    var _this = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WebSocket);

    jmEvent.enableEvent(this);
    var Adapter = opts.Adapter,
        _opts$reconnect = opts.reconnect,
        reconnect = _opts$reconnect === void 0 ? true : _opts$reconnect,
        _opts$reconnectTimeou = opts.reconnectTimeout,
        reconnectTimeout = _opts$reconnectTimeou === void 0 ? ReconnectTimeout : _opts$reconnectTimeou,
        _opts$reconnectAttemp = opts.reconnectAttempts,
        reconnectAttempts = _opts$reconnectAttemp === void 0 ? MaxReconnectAttempts : _opts$reconnectAttemp,
        _opts$pingFailedCode = opts.pingFailedCode,
        pingFailedCode = _opts$pingFailedCode === void 0 ? PingFailedCode : _opts$pingFailedCode;
    if (!Adapter) throw new Error('invalid Adapter');
    this.Adapter = Adapter;
    this.pingFailedCode = pingFailedCode;
    this.reconnect = reconnect;
    this.reconnectTimeout = reconnectTimeout;
    this.maxReconnectAttempts = reconnectAttempts;
    this.reconnectAttempts = 0;
    this._reconnectTimer = null;
    this.uri = null;
    this.ws = null;
    this.connecting = null; // or a promise instance

    var heart = new heartbeat(opts);
    this.heart = heart;
    heart.on('heartBeat', function () {
      return _this.emit('heartBeat');
    }).on('heartDead', function () {
      if (_this.emit('heartDead')) return;

      _this.close(_this.pingFailedCode, 'heartbeat timeout');
    });
  }

  _createClass(WebSocket, [{
    key: "onReady",
    value: function onReady() {
      if (this.ws) return;
      return this.connect();
    }
  }, {
    key: "connect",
    value: function connect(uri) {
      uri && (this.uri = uri);

      if (!this.connecting) {
        this.connecting = this._connect();
      }

      return this.connecting;
    }
  }, {
    key: "send",
    value: function send() {
      try {
        var _this3 = this,
            _arguments2 = arguments;

        return _await(_this3.onReady(), function () {
          try {
            var _this3$ws;

            (_this3$ws = _this3.ws).send.apply(_this3$ws, _toConsumableArray(_arguments2));

            _this3.heart.reset();
          } catch (e) {
            throw e;
          }
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this$ws;

      this._stopReconnect();

      if (!this.ws) return;

      (_this$ws = this.ws).close.apply(_this$ws, arguments);

      this.ws = null;
      this.connecting = null;
    }
  }, {
    key: "_connect",
    value: function _connect() {
      try {
        var _this5 = this;

        var uri = _this5.uri;
        if (!uri) throw new Error('invalid uri');
        if (_this5.ws) return;

        _this5.emit('connect');

        return new Promise(function (resolve, reject) {
          var ws = null;

          try {
            ws = new _this5.Adapter(uri);
          } catch (e) {
            return reject(e);
          }

          ws.on('message', function (opts) {
            _this5.heart.reset();

            _this5.emit('message', opts);
          }).on('open', function (opts) {
            _this5.emit('open', opts);

            _this5.ws = ws;
            _this5.connecting = null;

            _this5.heart.reset();

            _this5._stopReconnect();

            resolve();
          }).on('error', function (e) {
            _this5.emit('error', e);

            reject(e);
          }).on('close', function (opts) {
            _this5.emit('close', opts);

            _this5.heart.stop();

            _this5.ws = null;
            _this5.connecting = null;
            var _opts$wasClean = opts.wasClean,
                wasClean = _opts$wasClean === void 0 ? true : _opts$wasClean,
                code = opts.code;
            if (wasClean && code !== _this5.pingFailedCode) return;

            if (_this5.reconnect) {
              _this5._reconnect();
            }
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }, {
    key: "_reconnect",
    value: function _reconnect() {
      var _this6 = this;

      if (this.maxReconnectAttempts && this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.emit('connectFail');

        this._stopReconnect();

        return;
      }

      this.reconnectAttempts++;
      this.emit('reconnect');
      this._reconnectTimer = setTimeout(function () {
        _this6._reconnectTimer = null;

        _this6.connect()["catch"](function () {});
      }, this.reconnectTimeout);
    }
  }, {
    key: "_stopReconnect",
    value: function _stopReconnect() {
      if (this._reconnectTimer) {
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = null;
      }

      this.reconnectAttempts = 0;
    }
  }, {
    key: "ready",
    get: function get() {
      return !!this.ws;
    }
  }]);

  return WebSocket;
}();

WebSocket.MaxReconnectAttempts = MaxReconnectAttempts;
WebSocket.ReconnectTimeout = ReconnectTimeout;
WebSocket.PingFailedCode = PingFailedCode;
var ws = WebSocket;

var $ = {
  HeartBeat: heartbeat,
  WebSocket: ws
};
var lib = $;

export default lib;
//# sourceMappingURL=index.esm.js.map
