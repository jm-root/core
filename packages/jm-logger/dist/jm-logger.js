(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['jm-logger'] = {}));
}(this, (function (exports) { 'use strict';

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

  var levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };

  function none() {}

  var Logger =
  /*#__PURE__*/
  function () {
    function Logger() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Logger);

      this.level = opts.level || 'debug';
      this.category = opts.category || 'default';
    }

    _createClass(Logger, [{
      key: "level",
      set: function set(level) {
        var _this = this;

        level || (level = 'debug');
        this._levelName = level.toLocaleLowerCase();
        this._level = levels[this._levelName];
        Object.keys(levels).forEach(function (level) {
          if (_this._level < levels[level]) {
            _this[level] = none;
          } else {
            if (level === 'debug') {
              _this[level] = console.log.bind(console);
            } else {
              _this[level] = console[level].bind(console);
            }
          }
        });
      },
      get: function get() {
        return this._levelName;
      }
    }, {
      key: "levelValue",
      get: function get() {
        return this._level;
      }
    }]);

    return Logger;
  }();

  var loggers = {};

  var getLogger = function getLogger() {
    var loggerCategoryName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

    if (!loggers[loggerCategoryName]) {
      loggers[loggerCategoryName] = new Logger({
        category: loggerCategoryName
      });
    }

    return loggers[loggerCategoryName];
  };

  var moduleLogger = function moduleLogger() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'logger';
    var obj = this;
    obj.getLogger = getLogger;
    obj.logger = getLogger();
    return {
      name: name,
      unuse: function unuse() {
        delete obj.logger;
        delete obj.getLogger;
      }
    };
  };

  var $ = {
    logger: getLogger(),
    getLogger: getLogger,
    moduleLogger: moduleLogger
  };
  var lib = $;

  exports.default = lib;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jm-logger.js.map
