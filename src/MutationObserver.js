/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */

import MutationRecord from './MutationRecord'

type MutationObserverCallback = (
  records: Array<MutationRecord>,
  observer: MutationObserver, // eslint-disable-line
) => void

export default class MutationObserver {
  _callback: MutationObserverCallback

  constructor(callback: MutationObserverCallback) {
    if (typeof callback !== 'function') {
      throw new TypeError(
        "Failed to construct 'MutationObserver': The callback provided as parameter 1 is not a function.",
      )
    }

    Object.defineProperty(this, '_callback', {
      enumerable: false,
      value: callback,
      writable: false,
    })
  }

  // TODO: implement disconnect
  // TODO: implement observe
  // TODO: implement takeRecords
}
