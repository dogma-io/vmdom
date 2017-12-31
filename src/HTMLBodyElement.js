/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLBodyElement extends HTMLElement {
  constructor() {
    super({tagName: 'body'})
  }

  // TODO: implement window event handlers
}
