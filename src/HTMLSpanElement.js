/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSpanElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLSpanElement extends HTMLElement {
  constructor() {
    super({tagName: 'span'})
  }
}
