/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement
 */

import HTMLElement from './HTMLElement'

type HTMLQuoteElementOptions = {|
  tagName: 'blockquote' | 'cite' | 'q',
|}

export default class HTMLQuoteElement extends HTMLElement {
  constructor({tagName}: HTMLQuoteElementOptions) {
    super({tagName})
    // TODO: implement properties
  }

  // TODO: implement methods
}
