/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLPictureElement
 */

import HTMLElement from './HTMLElement'

export default class HTMLPictureElement extends HTMLElement {
  constructor() {
    super({tagName: 'picture'})
  }
}
