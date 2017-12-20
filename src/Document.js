/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import HTMLBodyElement from './HTMLBodyElement'
import HTMLElement from './HTMLElement'
import HTMLHeadElement from './HTMLHeadElement'
import nodeMixin from './mixins/Node'

type DocumentOptions = {|
  /**
   * Whether or not to insert a HTMLHeadElement in documentElement
   */
  includeBody: boolean,

  /**
   * Whether or not to insert a HTMLHeadElement in documentElement
   */
  includeHead: boolean,
|}

class Document {
  documentElement: HTMLElement

  constructor({includeBody, includeHead}: DocumentOptions) {
    let documentElement

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      documentElement: {
        enumerable: false,
        get() {
          if (!documentElement) {
            documentElement = new HTMLElement()

            if (includeHead) {
              documentElement.appendChild(new HTMLHeadElement())
            }

            if (includeBody) {
              documentElement.appendChild(new HTMLBodyElement())
            }
          }

          return documentElement
        },
      },
    })
  }
}

export default nodeMixin(Document)
