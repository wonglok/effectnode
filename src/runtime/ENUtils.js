export const getID = function () {
  return (
    '_' +
    Math.random().toString(36).substr(2, 9) +
    Math.random().toString(36).substr(2, 9)
  )
}

let isFunction = function (obj) {
  return typeof obj === 'function' || false
}

export class EventEmitter {
  constructor() {
    this.listeners = new Map()
  }

  addEventListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }

  removeEventListener(label, callback) {
    let listeners = this.listeners.get(label)
    let index = 0

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        let a = () => {
          i = index
          return i
        }
        return isFunction(listener) && listener === callback ? a() : i
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }

  trigger(label, ...args) {
    let listeners = this.listeners.get(label)

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener(...args)
      })
      return true
    }
    return false
  }
}

export const sleep = (t) => {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}
