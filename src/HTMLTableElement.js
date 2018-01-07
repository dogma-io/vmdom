/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement
 */

import HTMLElement from './HTMLElement'
import HTMLTableCaptionElement from './HTMLTableCaptionElement'

export default class HTMLTableElement extends HTMLElement {
  constructor() {
    super({tagName: 'table'})

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      caption: {
        enumerable: false,
        get(): ?HTMLTableCaptionElement {
          for (let i = 0; i < this.childNodes.length; i++) {
            const childNode = this.childNodes[i]

            if (childNode instanceof HTMLTableCaptionElement) {
              return childNode
            }
          }

          return null
        },
        set(newValue: HTMLTableCaptionElement) {
          if (!(newValue instanceof HTMLTableCaptionElement)) {
            throw new TypeError(
              "Failed to set the 'caption' property on 'HTMLTableElement': The provided value is not of type 'HTMLTableCaptionElement'.",
            )
          }

          for (let i = 0; i < this.childNodes.length; i++) {
            const childNode = this.childNodes[i]

            if (childNode instanceof HTMLTableCaptionElement) {
              this.removeChild(childNode)
              break
            }
          }

          this.insertBefore(newValue, this.childNodes[0] || null)
        },
      },
    })
    // TODO: implement properties
  }

  // TODO: implement createCaption
  // TODO: implement deleteCaption
  // TODO: implement deleteRow
  // TODO: implement createTFoot
  // TODO: implement deleteTFoot
  // TODO: implement createTHead
  // TODO: implement deleteTHead
  // TODO: implement insertRow
}
