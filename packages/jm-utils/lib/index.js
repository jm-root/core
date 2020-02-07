const { arg2bool, arg2number } = require('./argv')

let argsClass = '[object Arguments]'
let arrayClass = '[object Array]'
let boolClass = '[object Boolean]'
let dateClass = '[object Date]'
let funcClass = '[object Function]'
let numberClass = '[object Number]'
let objectClass = '[object Object]'
let regexpClass = '[object RegExp]'
let stringClass = '[object String]'

/** Used to identify object classifications that `cloneDeep` supports */
let cloneableClasses = {}
cloneableClasses[funcClass] = false
cloneableClasses[argsClass] = true
cloneableClasses[arrayClass] = true
cloneableClasses[boolClass] = true
cloneableClasses[dateClass] = true
cloneableClasses[numberClass] = true
cloneableClasses[objectClass] = true
cloneableClasses[regexpClass] = true
cloneableClasses[stringClass] = true

let ctorByClass = {}
ctorByClass[arrayClass] = Array
ctorByClass[boolClass] = Boolean
ctorByClass[dateClass] = Date
ctorByClass[objectClass] = Object
ctorByClass[numberClass] = Number
ctorByClass[regexpClass] = RegExp
ctorByClass[stringClass] = String

/** Used to match regexp flags from their coerced string values */
let reFlags = /\w*$/

let cloneDeep = function (obj) {
  if (typeof obj !== 'object' || !obj) return obj
  if (Array.isArray(obj)) {
    let ret = []
    obj.forEach(function (item) {
      ret.push(cloneDeep(item))
    })
    return ret
  }
  let className = toString.call(obj)
  if (!cloneableClasses[className]) {
    return obj
  }
  const Ctor = ctorByClass[className]
  switch (className) {
    case boolClass:
    case dateClass:
      return new Ctor(+obj)

    case numberClass:
    case stringClass:
      return new Ctor(obj)

    case regexpClass:
      return Ctor(obj.source, reFlags.exec(obj))
  }

  let ret = {}
  let keys = Object.keys(obj)
  keys.forEach(function (key) {
    ret[key] = cloneDeep(obj[key])
  })
  return ret
}

let merge = function (obj1, obj2) {
  if (typeof obj1 !== 'object' || !obj1) return obj1
  if (Array.isArray(obj1)) {
    obj2.forEach(function (item) {
      if (obj1.indexOf(item) === -1) {
        obj1.push(item)
      }
    })
    return obj1
  }
  let keys = Object.keys(obj2)
  keys.forEach(function (key) {
    if (obj1[key] && typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      merge(obj1[key], obj2[key])
    } else {
      obj1[key] = obj2[key]
    }
  })
  return obj1
}

let utils = {
  // 高效slice
  slice: (a, start, end) => {
    start = start || 0
    end = end || a.length
    if (start < 0) start += a.length
    if (end < 0) end += a.length
    let r = new Array(end - start)
    for (let i = start; i < end; i++) {
      r[i - start] = a[i]
    }
    return r
  },

  formatJSON: (obj) => {
    return JSON.stringify(obj, null, 2)
  },

  getUriProtocol: function (uri) {
    if (!uri) return null
    return uri.substring(0, uri.indexOf(':'))
  },

  getUriPath: function (uri) {
    let idx = uri.indexOf('//')
    if (idx === -1) return ''
    idx = uri.indexOf('/', idx + 2)
    if (idx === -1) return ''
    uri = uri.substr(idx)
    idx = uri.indexOf('#')
    if (idx === -1) idx = uri.indexOf('?')
    if (idx !== -1) uri = uri.substr(0, idx)
    return uri
  },

  cloneDeep,

  merge,
  arg2bool,
  arg2number
}

const moduleUtils = function (name = 'utils') {
  let app = this
  app[name] = utils

  return {
    name: name,
    unuse: function () {
      delete app[name]
    }
  }
}

const $ = {
  utils: utils,
  moduleUtils: moduleUtils,
  ...utils
}

module.exports = $
