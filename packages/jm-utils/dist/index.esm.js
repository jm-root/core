function _typeof(obj) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

// 参数值转为boolean
function arg2bool(value) {
  if (value === undefined) return value;

  var type = _typeof(value);

  if (type === 'boolean') {
    return value;
  } else if (type === 'string') {
    if (value === 'true') return true;
    return !!Number(value);
  } else if (type === 'number') {
    return !!value;
  }

  return false;
} // 参数值转为数字


function arg2number(value) {
  if (value === undefined) return value;

  var type = _typeof(value);

  if (type === 'number') {
    return value;
  } else if (type === 'boolean') {
    return value ? 1 : 0;
  } else if (type === 'string') {
    if (value === 'false') {
      return 0;
    } else if (value === 'true') {
      return 1;
    } else {
      return Number(value);
    }
  }

  return 0;
}

var argv = {
  arg2bool: arg2bool,
  arg2number: arg2number
};

var arg2bool$1 = argv.arg2bool,
    arg2number$1 = argv.arg2number;
var argsClass = '[object Arguments]';
var arrayClass = '[object Array]';
var boolClass = '[object Boolean]';
var dateClass = '[object Date]';
var funcClass = '[object Function]';
var numberClass = '[object Number]';
var objectClass = '[object Object]';
var regexpClass = '[object RegExp]';
var stringClass = '[object String]';
/** Used to identify object classifications that `cloneDeep` supports */

var cloneableClasses = {};
cloneableClasses[funcClass] = false;
cloneableClasses[argsClass] = true;
cloneableClasses[arrayClass] = true;
cloneableClasses[boolClass] = true;
cloneableClasses[dateClass] = true;
cloneableClasses[numberClass] = true;
cloneableClasses[objectClass] = true;
cloneableClasses[regexpClass] = true;
cloneableClasses[stringClass] = true;
var ctorByClass = {};
ctorByClass[arrayClass] = Array;
ctorByClass[boolClass] = Boolean;
ctorByClass[dateClass] = Date;
ctorByClass[objectClass] = Object;
ctorByClass[numberClass] = Number;
ctorByClass[regexpClass] = RegExp;
ctorByClass[stringClass] = String;
/** Used to match regexp flags from their coerced string values */

var reFlags = /\w*$/;

var cloneDeep = function cloneDeep(obj) {
  if (_typeof(obj) !== 'object' || !obj) return obj;

  if (Array.isArray(obj)) {
    var _ret = [];
    obj.forEach(function (item) {
      _ret.push(cloneDeep(item));
    });
    return _ret;
  }

  var className = toString.call(obj);

  if (!cloneableClasses[className]) {
    return obj;
  }

  var Ctor = ctorByClass[className];

  switch (className) {
    case boolClass:
    case dateClass:
      return new Ctor(+obj);

    case numberClass:
    case stringClass:
      return new Ctor(obj);

    case regexpClass:
      return Ctor(obj.source, reFlags.exec(obj));
  }

  var ret = {};
  var keys = Object.keys(obj);
  keys.forEach(function (key) {
    ret[key] = cloneDeep(obj[key]);
  });
  return ret;
};

var merge = function merge(obj1, obj2) {
  if (_typeof(obj1) !== 'object' || !obj1) return obj1;

  if (Array.isArray(obj1)) {
    obj2.forEach(function (item) {
      if (obj1.indexOf(item) === -1) {
        obj1.push(item);
      }
    });
    return obj1;
  }

  var keys = Object.keys(obj2);
  keys.forEach(function (key) {
    if (obj1[key] && _typeof(obj1[key]) === 'object' && _typeof(obj2[key]) === 'object') {
      merge(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  });
  return obj1;
};

var utils = {
  // 高效slice
  slice: function slice(a, start, end) {
    start = start || 0;
    end = end || a.length;
    if (start < 0) start += a.length;
    if (end < 0) end += a.length;
    var r = new Array(end - start);

    for (var i = start; i < end; i++) {
      r[i - start] = a[i];
    }

    return r;
  },
  formatJSON: function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
  },
  getUriProtocol: function getUriProtocol(uri) {
    if (!uri) return null;
    return uri.substring(0, uri.indexOf(':'));
  },
  getUriPath: function getUriPath(uri) {
    var idx = uri.indexOf('//');
    if (idx === -1) return '';
    idx = uri.indexOf('/', idx + 2);
    if (idx === -1) return '';
    uri = uri.substr(idx);
    idx = uri.indexOf('#');
    if (idx === -1) idx = uri.indexOf('?');
    if (idx !== -1) uri = uri.substr(0, idx);
    return uri;
  },
  cloneDeep: cloneDeep,
  merge: merge,
  arg2bool: arg2bool$1,
  arg2number: arg2number$1
};

var moduleUtils = function moduleUtils() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'utils';
  var app = this;
  app[name] = utils;
  return {
    name: name,
    unuse: function unuse() {
      delete app[name];
    }
  };
};

var $ = _objectSpread({
  utils: utils,
  moduleUtils: moduleUtils
}, utils);

var lib = $;

export default lib;
//# sourceMappingURL=index.esm.js.map
