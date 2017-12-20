/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import HTMLElement from './HTMLElement'
import nodeMixin from './mixins/Node'

class Document {
  documentElement: HTMLElement

  constructor() {
    let documentElement

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      documentElement: {
        enumerable: false,
        get() {
          if (!documentElement) {
            documentElement = new HTMLElement()
          }

          return documentElement
        },
      },
    })
  }
}

export default nodeMixin(Document)
