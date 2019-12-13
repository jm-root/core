(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global['jm-err'] = {}));
}(this, (function (exports) { 'use strict';

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
    /**
     * translate
     * @param {string} msg - msg to be translate
     * @param {string} lng - language
     * @return {String | null}
     */

  };

  var locale = function locale(msg, lng) {
    if (!lng || !lngs[lng]) return null;
    return lngs[lng][msg];
  };

  /**
   * err module.
   * @module err
   */

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
  /**
   * return an Error Object
   * @param {Object|String} E Err object or a message template
   * @param {Object} [opts] params
   * @return {Error}
   */


  function err(E, opts) {
    if (typeof E === 'string') {
      E = {
        msg: E
      };
    }

    var msg = errMsg(E.msg || E.message, opts);
    var code = E.err;
    code === undefined && (code = Err.FAIL.err);
    var status = Err.FA_INTERNALERROR.err;
    if (code === Err.SUCCESS.err) status = 200;
    if (isNumber(code) && code >= 200 && code <= 600) status = code;
    E.status !== undefined && (status = E.status);
    var e = new Error(msg);
    e.code = code;
    e.status = status;
    e.data = Object.assign(E, {
      err: code,
      msg: msg,
      status: status
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

  var $ = {
    Err: Err,
    errMsg: errMsg,
    err: err,
    enableErr: enableErr,
    disableErr: disableErr
  };
  var lib = $;

  exports.default = lib;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jm-err.js.map
