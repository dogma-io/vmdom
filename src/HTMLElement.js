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

type HTMLElementOptions = {|
  tagName: string,
|}

function blur() {
  // TODO: inform event listeners

  if (this.onblur) {
    this.onblur() // TODO: pass event argument
  }
}

function click() {
  // TODO: inform event listeners

  if (this.onclick) {
    this.onclick() // TODO: pass event argument
  }
}

function focus() {
  // TODO: inform event listeners

  if (this.onfocus) {
    this.onfocus() // TODO: pass event argument
  }
}

class HTMLElement extends Element {
  blur: () => void
  click: () => void
  focus: () => void

  constructor({tagName}: HTMLElementOptions) {
    super({tagName})

    defineEventHandlers(this, HTML_ELEMENT_EVENT_HANDLERS)

    Object.defineProperties(this, {
      blur: {
        enumerable: false,
        value: blur.bind(this),
        writable: false,
      },
      click: {
        enumerable: false,
        value: click.bind(this),
        writable: false,
      },
      focus: {
        enumerable: false,
        value: focus.bind(this),
        writable: false,
      },
    })

    // TODO: implement standard properties
  }
}

export default globalEventHandlersMixin(touchEventHandlersMixin(HTMLElement))
