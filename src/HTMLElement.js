/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 */

import Element from './Element'
import globalEventHandlersMixin from './mixins/GlobalEventHandlers'
import touchEventHandlersMixin from './mixins/TouchEventHandlers'
import {defineEventHandlers} from './utils'

export const HTML_ELEMENT_EVENT_HANDLERS = ['oncopy', 'oncut', 'onpaste']

type HTMLElementOptions = {
  tagName?: string,
}

class HTMLElement extends Element {
  constructor(options: HTMLElementOptions) {
    options = options || {}

    super({
      tagName: 'tagName' in options ? options.tagName : 'html',
    })

    defineEventHandlers(this, HTML_ELEMENT_EVENT_HANDLERS)

    // TODO: implement standard properties
  }

  blur() {
    // TODO: inform event listeners

    if (this.onblur) {
      this.onblur() // TODO: pass event argument
    }
  }

  click() {
    // TODO: inform event listeners

    if (this.onclick) {
      this.onclick() // TODO: pass event argument
    }
  }

  focus() {
    // TODO: inform event listeners

    if (this.onfocus) {
      this.onfocus() // TODO: pass event argument
    }
  }
}

export default globalEventHandlersMixin(touchEventHandlersMixin(HTMLElement))
