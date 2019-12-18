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

/**
 * module.
 * @module module
 */

/**
 * Class representing a modulable object.
 *
 */
var Modulable =
/*#__PURE__*/
function () {
  /**
     * Create an modulable object.
     */
  function Modulable() {
    _classCallCheck(this, Modulable);

    this._modules = {};
  }
  /**
     * modules
     * @return {Object}
     */


  _createClass(Modulable, [{
    key: "use",

    /**
       * use a module
       * @param {Function} fn module function
       * @param args any arguments
       * @return {Modulable} for chaining
       */
    value: function use(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var m = fn.apply(this, args);

      if (m && m.name) {
        this._modules[m.name] = m;
      }

      return this;
    }
    /**
       * unuse a module
       * @param {Object|String} nameOrModule module or name to be unused
       * @return {Modulable} for chaining
       */

  }, {
    key: "unuse",
    value: function unuse(nameOrModule) {
      var m = nameOrModule;
      if (typeof m === 'string') m = this._modules[m];

      if (m && m.unuse) {
        if (m.name) {
          delete this._modules[m.name];
        }

        m.unuse();
      }

      return this;
    }
  }, {
    key: "modules",
    get: function get() {
      return this._modules;
    }
  }]);

  return Modulable;
}();

var prototype = Modulable.prototype;
var M = {
  _modules: {},
  use: prototype.use,
  unuse: prototype.unuse
  /**
   * enable modulable support for obj
   * @param {Object} obj target object
   * @return {boolean}
   */

};

var enableModule = function enableModule(obj) {
  if (obj.use !== undefined) return false;

  for (var key in M) {
    obj[key] = M[key];
  }

  obj._modules = {};
  Object.defineProperty(obj, 'modules', {
    value: obj._modules,
    writable: false
  });
  return true;
};
/**
 * disable modulable support for obj
 * @param {Object} obj target object
 */


var disableModule = function disableModule(obj) {
  if (obj.use === undefined) return;

  for (var key in M) {
    delete obj[key];
  }
};

var $ = {
  Modulable: Modulable,
  enableModule: enableModule,
  disableModule: disableModule
};
var lib = $;

export default lib;
//# sourceMappingURL=index.esm.js.map
