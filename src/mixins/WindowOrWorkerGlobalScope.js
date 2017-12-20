/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope
 */

import DOMException from '../DOMException'
import fetch from 'node-fetch'

export default (Klass: *) => {
  return class WindowOrWorkerGlobalScope extends Klass {
    constructor(...args: any) {
      super(...args)

      Object.defineProperties(this, {
        _intervalIds: {
          enumerable: false,
          value: new Set(),
          writable: false,
        },
        _timeoutIds: {
          enumerable: false,
          value: new Set(),
          writable: false,
        },
      })
    }

    static destroy(instance: *) {
      instance._intervalIds.forEach((intervalId: number) => {
        instance.clearInterval(intervalId)
      })

      instance._timeoutIds.forEach((timeoutId: number) => {
        instance.clearTimeout(timeoutId)
      })

      if (typeof Klass.destroy === 'function') {
        Klass.destroy(instance)
      }
    }

    atob(encodedData: string) {
      return Buffer.from(encodedData, 'base64').toString('binary')
    }

    btoa(value?: *) {
      // $FlowFixMe - Flow complains that undefined can't be converted to a string but it can, it becomes "undefined".
      const string: string = `${value}`

      for (let i = string.length - 1; i >= 0; i--) {
        if (string.charCodeAt(i) > 255) {
          throw new DOMException(
            "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.",
          )
        }
      }

      return Buffer.from(string, 'binary').toString('base64')
    }

    clearInterval(intervalId: number) {
      this._intervalIds.delete(intervalId)
      return clearInterval(...arguments)
    }

    clearTimeout(timeoutId: number) {
      this._timeoutIds.delete(timeoutId)
      return clearTimeout(...arguments)
    }

    // TODO: implement createImageBitmap()

    // TODO: come up with way to track incomplete fetch requests that can be
    // cancelled when instance of class is destroyed
    fetch() {
      return fetch(...arguments)
    }

    setInterval() {
      const id = setInterval(...arguments)
      this._intervalIds.add(id)
      return id
    }

    setTimeout() {
      const id = setTimeout(...arguments)
      this._timeoutIds.add(id)
      return id
    }
  }
}
