/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDListElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLDListElement extends HTMLElement {
  constructor() {
    super({tagName: 'dl'})
  }
}
