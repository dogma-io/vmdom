/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement
 */

import HTMLElement from './HTMLElement'

type HTMLModElementOptions = {|
  tagName: 'del' | 'ins',
|}

export default class HTMLModElement extends HTMLElement {
  constructor({tagName}: HTMLModElementOptions) {
    super({tagName})
    // TODO: implement properties
  }

  // TODO: implement methods
}
