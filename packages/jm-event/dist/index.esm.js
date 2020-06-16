function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

var _async = function () {
  try {
    if (isNaN.apply(null, {})) {
      return function (f) {
        return function () {
          try {
            return Promise.resolve(f.apply(this, arguments));
          } catch (e) {
            return Promise.reject(e);
          }
        };
      };
    }
  } catch (e) {}

  return function (f) {
    // Pre-ES5.1 JavaScript runtimes don't accept array-likes in Function.apply
    return function () {
      var args = [];

      for (var i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];
      }

      try {
        return Promise.resolve(f.apply(this, args));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };
}();

function _for(test, update, body) {
  var stage;

  for (;;) {
    var shouldContinue = test();

    if (_isSettledPact(shouldContinue)) {
      shouldContinue = shouldContinue.__value;
    }

    if (!shouldContinue) {
      return result;
    }

    if (shouldContinue.then) {
      stage = 0;
      break;
    }

    var result = body();

    if (result && result.then) {
      if (_isSettledPact(result)) {
        result = result.__state;
      } else {
        stage = 1;
        break;
      }
    }

    if (update) {
      var updateValue = update();

      if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
        stage = 2;
        break;
      }
    }
  }

  var pact = new _Pact();

  var reject = _settle.bind(null, pact, 2);

  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;

  function _resumeAfterBody(value) {
    result = value;

    do {
      if (update) {
        updateValue = update();

        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          updateValue.then(_resumeAfterUpdate).then(void 0, reject);
          return;
        }
      }

      shouldContinue = test();

      if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.__value) {
        _settle(pact, 1, result);

        return;
      }

      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        return;
      }

      result = body();

      if (_isSettledPact(result)) {
        result = result.__value;
      }
    } while (!result || !result.then);

    result.then(_resumeAfterBody).then(void 0, reject);
  }

  function _resumeAfterTest(shouldContinue) {
    if (shouldContinue) {
      result = body();

      if (result && result.then) {
        result.then(_resumeAfterBody).then(void 0, reject);
      } else {
        _resumeAfterBody(result);
      }
    } else {
      _settle(pact, 1, result);
    }
  }

  function _resumeAfterUpdate() {
    if (shouldContinue = test()) {
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
      } else {
        _resumeAfterTest(shouldContinue);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
}

function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.__state === 1;
}

var _Pact = function () {
  function _Pact() {}

  _Pact.prototype.then = function (onFulfilled, onRejected) {
    var state = this.__state;

    if (state) {
      var callback = state == 1 ? onFulfilled : onRejected;

      if (callback) {
        var _result2 = new _Pact();

        try {
          _settle(_result2, 1, callback(this.__value));
        } catch (e) {
          _settle(_result2, 2, e);
        }

        return _result2;
      } else {
        return this;
      }
    }

    var result = new _Pact();

    this.__observer = function (_this) {
      try {
        var value = _this.__value;

        if (_this.__state == 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };

    return result;
  };

  return _Pact;
}();

function _settle(pact, state, value) {
  if (!pact.__state) {
    if (value instanceof _Pact) {
      if (value.__state) {
        if (state === 1) {
          state = value.__state;
        }

        value = value.__value;
      } else {
        value.__observer = _settle.bind(null, pact, state);
        return;
      }
    }

    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }

    pact.__state = state;
    pact.__value = value;
    var observer = pact.__observer;

    if (observer) {
      observer(pact);
    }
  }
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  value = Promise.resolve(value);
  return then ? value.then(then) : value;
}

/**
 * event module.
 * @module event
 */
var emitAsync = _async(function (eventName) {
  var _this = this,
      _exit = false;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // using a copy to avoid error when listener array changed
  var listeners = _this.listeners(eventName);

  var i = 0;
  return _for(function () {
    return !_exit && i < listeners.length;
  }, function () {
    return i++;
  }, function () {
    var fn = listeners[i];
    var obj = fn.apply(void 0, args);
    return _invoke(function () {
      if (!!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function') return _await(obj, function (_obj) {
        obj = _obj;
      });
    }, function () {
      if (obj !== undefined) {
        _exit = true;
        return obj;
      }
    });
  });
});
/**
 * Class representing an eventEmitter.
 *
 * ```javascript
 * // es6
 * let eventEmitter = new EventEmitter();
 * eventEmitter.on('test', (info) => {
 *      console.log(info);
 * });
 * eventEmitter.once('test', (info) => {
 *      // this will be called only one time
 *      console.log(info);
 * });
 * eventEmitter.one('test', (info) => {
 *      // this will be called first
 *      console.log(info);
 * }, true);
 *
 * eventEmitter.emit('test', 'hello eventEmitter');
 * eventEmitter.off('test');
 * ```
 */


var EventEmitter = /*#__PURE__*/function () {
  /**
   * Create an eventEmitter.
   */
  function EventEmitter() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, EventEmitter);

    this._events = {};
    if (opts.async) this.emit = emitAsync;
  }
  /**
   * Adds the listener function to the end of the listeners array for the event named eventName.
   * No checks are made to see if the listener has already been added.
   * Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
   *
   * @param {*} eventName - event name
   * @param {Function} fn - listener function
   * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
   * @return {EventEmitter} - for chaining
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, fn, prepend) {
      this._events[eventName] || (this._events[eventName] = []);

      if (prepend) {
        this._events[eventName].unshift(fn);
      } else {
        this._events[eventName].push(fn);
      }

      return this;
    }
    /**
     * Adds a one time listener function for the event named eventName.
     * The next time eventName is triggered, this listener is removed and then invoked.
     *
     * @param {*} eventName - event name
     * @param {Function} fn - listener function
     * @param {boolean} [prepend] - Adds to the beginning of the listeners array if true
     * @return {EventEmitter} - for chaining
     */

  }, {
    key: "once",
    value: function once(eventName, fn, prepend) {
      var _this2 = this;

      var on = function on(arg1, arg2, arg3, arg4, arg5) {
        _this2.off(eventName, on);

        fn(arg1, arg2, arg3, arg4, arg5);
      };

      return this.on(eventName, on, prepend);
    }
    /**
     * Removes a listener for the event named eventName.
     * Removes all listeners from the listener array for event named eventName if fn is null
     * Removes all listeners from the listener array if eventName is null
     *
     * @param {*} [eventName] - event name
     * @param {Function} [fn] - listener function
     * @return {EventEmitter} - for chaining
     */

  }, {
    key: "off",
    value: function off(eventName, fn) {
      if (!fn) {
        if (eventName === undefined) {
          this._events = {};
        } else if (this._events && this._events[eventName]) {
          delete this._events[eventName];
        }
      } else if (this._events && this._events[eventName]) {
        var list = this._events[eventName];

        for (var _i = 0; _i < list.length; _i++) {
          if (fn === list[_i]) {
            list.splice(_i, 1);

            if (!list.length) {
              delete this._events[eventName];
            }

            break;
          }
        }
      }

      return this;
    }
    /**
     * Synchronously calls each of the listeners registered for the event named eventName,
     * in the order they were registered, passing the supplied arguments to each.
     *
     * to break the calls, just return false on listener function.
     * ```javascript
     * // es6
     * let eventEmitter = new EventEmitter();
     * eventEmitter.on('test', (info) => {
       *      // this will be called
       *      console.log(info);
       * });
     * eventEmitter.on('test', (info) => {
       *      // this will be called
       *      return false;  // this break the calls
       * });
     * eventEmitter.on('test', (info) => {
       *      // this will not be called.
       *      console.log(info);
       * });
     * eventEmitter.emit('test', 'hello eventEmitter');
     * ```
     * tip: use arg1...arg5 instead of arguments for performance consider.
     *
     * @param {*} eventName - event name
     * @param {*} arg1
     * @param {*} arg2
     * @param {*} arg3
     * @param {*} arg4
     * @param {*} arg5
     * @return {EventEmitter} - for chaining
     */

  }, {
    key: "emit",
    value: function emit(eventName) {
      // using a copy to avoid error when listener array changed
      var listeners = this.listeners(eventName);

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      for (var _i2 = 0; _i2 < listeners.length; _i2++) {
        var fn = listeners[_i2];
        var obj = fn.apply(void 0, args);

        if (!!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function') ; else {
          if (obj !== undefined) return obj;
        }
      }
    }
    /**
     * Returns an array listing the events for which the emitter has registered listeners.
     * The values in the array will be strings or Symbols.
     * @return {Array}
     */

  }, {
    key: "eventNames",
    value: function eventNames() {
      return Object.keys(this._events);
    }
    /**
     * Returns a copy of the array of listeners for the event named eventName.
     * @param {*} eventName - event name
     * @return {Array} - listener array
     */

  }, {
    key: "listeners",
    value: function listeners(eventName) {
      var v = this._events[eventName];
      if (!v) return [];
      var listeners = new Array(v.length);

      for (var _i3 = 0; _i3 < v.length; _i3++) {
        listeners[_i3] = v[_i3];
      }

      return listeners;
    }
  }]);

  return EventEmitter;
}();

var prototype = EventEmitter.prototype;
var EM = {
  _events: {},
  on: prototype.on,
  once: prototype.once,
  off: prototype.off,
  emit: prototype.emit,
  eventNames: prototype.eventNames,
  listeners: prototype.listeners
};

var enableEvent = function enableEvent(obj) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (obj.emit !== undefined && !opts.force) return false;
  var _events = null;

  if (obj.emit !== undefined) {
    _events = obj._events;
  }

  for (var key in EM) {
    obj[key] = EM[key];
  }

  obj._events = _events || {};
  if (opts.clean && _events) obj._events = {};
  if (opts.async) obj.emit = emitAsync;
  return true;
};

var disableEvent = function disableEvent(obj) {
  if (obj.emit === undefined) return;

  for (var key in EM) {
    delete obj[key];
  }
};

var lib = {
  EventEmitter: EventEmitter,
  enableEvent: enableEvent,
  disableEvent: disableEvent
};
var lib_1 = lib.EventEmitter;
var lib_2 = lib.enableEvent;
var lib_3 = lib.disableEvent;

export default lib;
export { lib_1 as EventEmitter, lib_3 as disableEvent, lib_2 as enableEvent };
//# sourceMappingURL=index.esm.js.map
