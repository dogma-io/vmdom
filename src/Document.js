/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import HTMLBodyElement from './HTMLBodyElement'
import HTMLHtmlElement from './HTMLHtmlElement'
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
  documentElement: HTMLHtmlElement

  constructor({includeBody, includeHead}: DocumentOptions) {
    let documentElement

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      documentElement: {
        enumerable: false,
        get() {
          if (!documentElement) {
            documentElement = new HTMLHtmlElement()

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
