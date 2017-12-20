/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLHeadElement extends HTMLElement {
  constructor() {
    super({tagName: 'head'})
  }
}
