'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var zh_CN = {
  'Success': '成功',
  'Fail': '失败',
  'System Error': '系统错误',
  'Network Error': '网络错误',
  'Parameter Error': '参数错误',
  'Busy': '忙',
  'Time Out': '超时',
  'Abort': '中止',
  'Not Ready': '未准备好',
  'Not Exists': '不存在',
  'Already Exists': '已存在',
  'Validation Error': '校验错误',
  'OK': 'OK',
  'Bad Request': '错误请求',
  'Unauthorized': '未验证',
  'Forbidden': '无权限',
  'Not Found': '未找到',
  'Internal Server Error': '服务器内部错误',
  'Service Unavailable': '无效服务'
};

var lngs = {
  zh_CN: zh_CN
};
/**
 * translate
 * @param {string} msg - msg to be translate
 * @param {string} lng - language
 * @return {String | null}
 */

var locale = function locale(msg, lng) {
  if (!lng || !lngs[lng]) return null;
  return lngs[lng][msg];
};

function isNumber(obj) {
  return typeof obj === 'number' && isFinite(obj);
}
/**
 * common error defines
 *
 */


var Err = {
  SUCCESS: {
    err: 0,
    msg: 'Success'
  },
  FAIL: {
    err: 1,
    msg: 'Fail'
  },
  FA_SYS: {
    err: 2,
    msg: 'System Error'
  },
  FA_NETWORK: {
    err: 3,
    msg: 'Network Error'
  },
  FA_PARAMS: {
    err: 4,
    msg: 'Parameter Error'
  },
  FA_BUSY: {
    err: 5,
    msg: 'Busy'
  },
  FA_TIMEOUT: {
    err: 6,
    msg: 'Time Out'
  },
  FA_ABORT: {
    err: 7,
    msg: 'Abort'
  },
  FA_NOTREADY: {
    err: 8,
    msg: 'Not Ready'
  },
  FA_NOTEXISTS: {
    err: 9,
    msg: 'Not Exists'
  },
  FA_EXISTS: {
    err: 10,
    msg: 'Already Exists'
  },
  FA_VALIDATION: {
    err: 11,
    msg: 'Validation Error'
  },
  OK: {
    err: 200,
    msg: 'OK'
  },
  FA_BADREQUEST: {
    err: 400,
    msg: 'Bad Request'
  },
  FA_NOAUTH: {
    err: 401,
    msg: 'Unauthorized'
  },
  FA_NOPERMISSION: {
    err: 403,
    msg: 'Forbidden'
  },
  FA_NOTFOUND: {
    err: 404,
    msg: 'Not Found'
  },
  FA_INTERNALERROR: {
    err: 500,
    msg: 'Internal Server Error'
  },
  FA_UNAVAILABLE: {
    err: 503,
    msg: 'Service Unavailable'
  }
};
Err.t = locale;
/**
 * return message from template
 *
 * ```javascript
 * errMsg('sampe ${name} ${value}', {name: 'jeff', value: 123});
 * // return 'sample jeff 123'
 * ```
 *
 * @param {String} msg message template
 * @param {Object} opts params
 * @return {String} final message
 */

function errMsg(msg, opts) {
  if (opts) {
    for (var key in opts) {
      msg = msg.split('${' + key + '}').join(opts[key]);
    }
  }

  return msg;
}

function isValidStatus(status) {
  return status !== undefined && isNumber(status) && status >= 100 && status <= 600;
}
/**
 * return an Err object
 * @param {Object|String} E Err object or a message
 * @return {Err}
 */


function validErr(E) {
  typeof E === 'string' && (E = {
    msg: E
  });
  var SUCCESS = Err.SUCCESS,
      FAIL = Err.FAIL,
      FA_INTERNALERROR = Err.FA_INTERNALERROR;
  var _E = E,
      _E$err = _E.err,
      err = _E$err === void 0 ? FAIL.err : _E$err,
      status = _E.status;

  if (!isValidStatus(status)) {
    isValidStatus(err) && (status = err);
    err === SUCCESS.err && (status = 200);
  }

  !isValidStatus(status) && (status = FA_INTERNALERROR.err);
  Object.assign(E, {
    err: err,
    status: status
  });
  return E;
}
/**
 * return an Error Object
 * @param {Object|String} E Err object or a message template
 * @param {Object} [opts] params
 * @return {Error}
 */


function err(E, opts) {
  if (E instanceof Error) {
    var _E2 = E,
        code = _E2.code,
        _status = _E2.status,
        _msg = _E2.message,
        data = _E2.data;
    var EE = validErr({
      err: code,
      status: _status
    });
    Object.assign(E, EE);
    data || (E.data = _objectSpread2({}, EE, {
      msg: _msg
    }));
    return E;
  }

  E = validErr(E);
  var _E3 = E,
      err = _E3.err,
      status = _E3.status;
  var msg = errMsg(E.msg || E.message, opts);
  var e = new Error(msg);
  Object.assign(e, {
    code: err,
    status: status,
    data: _objectSpread2({}, E, {
      msg: msg
    })
  });
  return e;
}
/**
 * enable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 * @return {boolean}
 */


function enableErr(obj) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Err';
  if (obj[name]) return false;
  obj[name] = Err;
  obj.err = err;
  obj.errMsg = errMsg;
  return true;
}
/**
 * disable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 */


function disableErr(obj) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Err';
  if (!obj[name]) return;
  delete obj[name];
  delete obj.err;
  delete obj.errMsg;
}

var lib = {
  Err: Err,
  validErr: validErr,
  errMsg: errMsg,
  err: err,
  t: locale,
  enableErr: enableErr,
  // deprecated
  disableErr: disableErr // deprecated

};
var lib_1 = lib.Err;
var lib_2 = lib.validErr;
var lib_3 = lib.errMsg;
var lib_4 = lib.err;
var lib_5 = lib.t;
var lib_6 = lib.enableErr;
var lib_7 = lib.disableErr;

exports.Err = lib_1;
exports.default = lib;
exports.disableErr = lib_7;
exports.enableErr = lib_6;
exports.err = lib_4;
exports.errMsg = lib_3;
exports.t = lib_5;
exports.validErr = lib_2;
//# sourceMappingURL=index.js.map
