/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
 */

import {isPropertyNumber} from './utils'

// TODO: improve class typing with <T>
export default class HTMLCollection {
  constructor(items: Array<*>): * {
    return new Proxy(this, {
      get(target: *, property: string): * {
        if (property === 'length') {
          return items.length
        }

        if (isPropertyNumber(property)) {
          return items[parseInt(property)]
        }

        // $FlowFixMe - Flow doesn't like referencing arbitrary props on target
        return target[property]
      },
      set(target: *, property: string, value: *): * {
        // length and items are read-only but the browser silently fails when
        // trying to set them, simply returning the attempted new value.
        if (property === 'length' || isPropertyNumber(property)) {
          return value
        }

        // $FlowFixMe - Flow doesn't like adding arbitrary props to target
        return (target[property] = value)
      },
    })
  }

  // TODO: implement item
  // TODO: imlement namedItem
}
