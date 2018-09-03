/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
 */

import eventTargetMixin from './mixins/EventTarget'
import {defineEventHandlers} from './utils'

export const MEDIA_QUERY_LIST_EVENT_HANDLERS = ['onchange']

class MediaQueryList {
  matches: boolean
  media: string

  constructor(mediaQuery: string) {
    Object.defineProperties(this, {
      matches: {
        enumerable: false,
        value: false, // TODO: can/should this be calculated?
        writable: false,
      },
      media: {
        enumerable: false,
        value: mediaQuery,
        writable: false,
      },
    })

    defineEventHandlers(this, MEDIA_QUERY_LIST_EVENT_HANDLERS)
  }

  static destroy(instance: *) {
    // Nothing to destroy
  }
}

export default eventTargetMixin(MediaQueryList)
