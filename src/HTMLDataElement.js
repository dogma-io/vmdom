/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLDataElement extends HTMLElement {
  constructor() {
    super({tagName: 'data'})
    // TODO: implement properties
  }
}
