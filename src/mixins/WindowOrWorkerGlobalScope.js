/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope
 */

import DOMException from '../DOMException'
import fetch from 'node-fetch'

export default (Klass: *) => {
  return class WindowOrWorkerGlobalScope extends Klass {
    atob(encodedData: string) {
      return Buffer.from(encodedData, 'base64').toString('binary')
    }

    btoa(value?: *) {
      // $FlowFixMe - Flow complains that undefined can't be converted to a string but it can, it becomes "undefined".
      const string: string = `${value}`

      for (let i = string.length - 1; i >= 0; i--) {
        if (string.charCodeAt(i) > 255) {
          throw new DOMException(
            "Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."
          )
        }
      }

      return Buffer.from(string, 'binary').toString('base64')
    }

    clearInterval() {
      return clearInterval(...arguments)
    }

    clearTimeout() {
      return clearTimeout(...arguments)
    }

    // TODO: implement createImageBitmap()

    fetch() {
      return fetch(...arguments)
    }

    setInterval() {
      return setInterval(...arguments)
    }

    setTimeout() {
      return setTimeout(...arguments)
    }
  }
}
