/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
 */

export default (Klass: *) => {
  return class EventTarget extends Klass {
    _listeners: {[type: string]: EventListener[]}

    constructor() {
      super(...arguments)

      Object.defineProperty(this, '_listeners', {
        enumerable: false,
        value: {},
        writable: false,
      })
    }

    // TODO: add support for options/useCapture argument
    addEventListener(type: string, listener: EventListener): void {
      if (!Array.isArray(this._listeners[type])) {
        this._listeners[type] = []
      }

      const listenerType = typeof listener

      if (['function', 'object'].indexOf(listenerType) === -1) {
        throw new Error(
          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': The callback provided as parameter 2 is not a function.",
        )
      }

      const index = this._listeners[type].indexOf(listener)

      if (index === -1) {
        this._listeners[type].push(listener)
      }
    }

    dispatchEvent(event: Event): boolean {
      const {type} = event

      if (!(type in this._listeners)) {
        return true
      }

      this._listeners[type].forEach(callback => {
        if (typeof callback === 'function') {
          callback.call(this, event)
        } else {
          callback.handleEvent.call(this, event)
        }
      })

      return !event.defaultPrevented
    }

    // TODO: add support for options/useCapture argument
    removeEventListener(type: string, callback: EventListener): void {
      if (type in this._listeners) {
        const stack = this._listeners[type]
        const index = stack.indexOf(callback)

        if (index !== -1) {
          stack.splice(index, 1)
        }
      }
    }
  }
}