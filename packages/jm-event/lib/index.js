/**
 * event module.
 * @module event
 */

async function emitAsync (eventName, arg1, arg2, arg3, arg4, arg5) {
  // using a copy to avoid error when listener array changed
  let listeners = this.listeners(eventName)
  for (let i = 0; i < listeners.length; i++) {
    let fn = listeners[i]
    let obj = fn(arg1, arg2, arg3, arg4, arg5)
    if (!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function') obj = await obj
    if (obj !== undefined) return obj
  }
}

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
class EventEmitter {
  /**
   * Create an eventEmitter.
   */
  constructor (opts = {}) {
    this._events = {}
    if (opts.async) this.emit = emitAsync
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
  on (eventName, fn, prepend) {
    this._events[eventName] || (this._events[eventName] = [])
    if (prepend) {
      this._events[eventName].unshift(fn)
    } else {
      this._events[eventName].push(fn)
    }
    return this
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
  once (eventName, fn, prepend) {
    let on = (arg1, arg2, arg3, arg4, arg5) => {
      this.off(eventName, on)
      fn(arg1, arg2, arg3, arg4, arg5)
    }
    return this.on(eventName, on, prepend)
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
  off (eventName, fn) {
    if (!fn) {
      if (eventName === undefined) {
        this._events = {}
      } else if (this._events && this._events[eventName]) {
        delete this._events[eventName]
      }
    } else if (this._events && this._events[eventName]) {
      let list = this._events[eventName]
      for (let i = 0; i < list.length; i++) {
        if (fn === list[i]) {
          list.splice(i, 1)
          if (!list.length) {
            delete this._events[eventName]
          }
          break
        }
      }
    }
    return this
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
  emit (eventName, arg1, arg2, arg3, arg4, arg5) {
    // using a copy to avoid error when listener array changed
    let listeners = this.listeners(eventName)
    for (let i = 0; i < listeners.length; i++) {
      let fn = listeners[i]
      let obj = fn(arg1, arg2, arg3, arg4, arg5)
      if (!!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function') {
      } else {
        if (obj !== undefined) return obj
      }
    }
  }

  /**
   * Returns an array listing the events for which the emitter has registered listeners.
   * The values in the array will be strings or Symbols.
   * @return {Array}
   */
  eventNames () {
    return Object.keys(this._events)
  }

  /**
   * Returns a copy of the array of listeners for the event named eventName.
   * @param {*} eventName - event name
   * @return {Array} - listener array
   */
  listeners (eventName) {
    let v = this._events[eventName]
    if (!v) return []
    let listeners = new Array(v.length)
    for (let i = 0; i < v.length; i++) {
      listeners[i] = v[i]
    }
    return listeners
  }
}

let prototype = EventEmitter.prototype
let EM = {
  _events: {},
  on: prototype.on,
  once: prototype.once,
  off: prototype.off,
  emit: prototype.emit,
  eventNames: prototype.eventNames,
  listeners: prototype.listeners
}

let enableEvent = (obj, opts = {}) => {
  if (obj.emit !== undefined && !opts.force) return false
  for (let key in EM) {
    obj[key] = EM[key]
  }
  obj._events = {}
  if (opts.async) obj.emit = emitAsync
  return true
}

let disableEvent = (obj) => {
  if (obj.emit === undefined) return
  for (let key in EM) {
    delete obj[key]
  }
}

let $ = {
  EventEmitter: EventEmitter,
  enableEvent: enableEvent,
  disableEvent: disableEvent
}

module.exports = $
