/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLPreElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLPreElement extends HTMLElement {
  constructor() {
    super({tagName: 'pre'})
  }
}
