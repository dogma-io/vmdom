/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLHtmlElement extends HTMLElement {
  constructor() {
    super({tagName: 'html'})
    // TODO: implement version property
  }
}
