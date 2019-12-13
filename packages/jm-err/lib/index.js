/**
 * err module.
 * @module err
 */

const t = require('./locale')

function isNumber (obj) {
  return typeof obj === 'number' && isFinite(obj)
}

/**
 * common error defines
 *
 */
let Err = {
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
}

Err.t = t

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
function errMsg (msg, opts) {
  if (opts) {
    for (let key in opts) {
      msg = msg.split('${' + key + '}').join(opts[key])
    }
  }
  return msg
}

/**
 * return an Error Object
 * @param {Object|String} E Err object or a message template
 * @param {Object} [opts] params
 * @return {Error}
 */
function err (E, opts) {
  if (typeof E === 'string') {
    E = {
      msg: E
    }
  }
  let msg = errMsg(E.msg || E.message, opts)
  let code = E.err
  code === undefined && (code = Err.FAIL.err)
  let status = Err.FA_INTERNALERROR.err
  if (code === Err.SUCCESS.err) status = 200
  if (isNumber(code) && code >= 200 && code <= 600) status = code
  E.status !== undefined && (status = E.status)
  let e = new Error(msg)
  e.code = code
  e.status = status
  e.data = Object.assign(E, { err: code, msg, status })
  return e
}

/**
 * enable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 * @return {boolean}
 */
function enableErr (obj, name = 'Err') {
  if (obj[name]) return false
  obj[name] = Err
  obj.err = err
  obj.errMsg = errMsg
  return true
}

/**
 * disable Err Object, errMsg and err function for obj
 * @param {Object} obj target object
 * @param {String} [name] name to bind
 */
function disableErr (obj, name = 'Err') {
  if (!obj[name]) return
  delete obj[name]
  delete obj.err
  delete obj.errMsg
}

let $ = {
  Err: Err,
  errMsg: errMsg,
  err: err,
  enableErr: enableErr,
  disableErr: disableErr
}

module.exports = $
