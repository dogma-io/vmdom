/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEventHandlers
 */

import {defineEventHandlers} from '../utils'

export const TOUCH_EVENT_HANDLERS = [
  'ontouchstart',
  'ontouchend',
  'ontouchmove',
  'ontouchenter',
  'ontouchleave',
  'ontouchcancel',
]

export default (Klass: *) => {
  return class TouchEventHandlers extends Klass {
    constructor(...args: any) {
      super(...args)
      defineEventHandlers(this, TOUCH_EVENT_HANDLERS)
    }
  }
}
