/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

import nodeMixin from './mixins/Node'
import {defineEventHandlers} from './utils'

type ElementOptions = {|
  tagName: string,
|}

export const ELEMENT_EVENT_HANDLERS = [
  'ongotpointercapture',
  'onlostpointercapture',
]

class Element {
  tagName: string

  constructor({tagName}: ElementOptions) {
    Object.defineProperties(this, {
      tagName: {
        enumerable: false,
        value: tagName,
        writable: false,
      },
    })

    defineEventHandlers(this, ELEMENT_EVENT_HANDLERS)

    // TODO: implement standard properties
  }

  // TODO: implement methods
}

export default nodeMixin(Element)
