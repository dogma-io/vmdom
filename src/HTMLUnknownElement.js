/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement
 */

import HTMLElement from './HTMLElement'

type HTMLUnknownElementOptions = {|
  tagName: string,
|}

export default class HTMLUnknownElement extends HTMLElement {
  constructor({tagName}: HTMLUnknownElementOptions) {
    super({tagName})
  }
}
