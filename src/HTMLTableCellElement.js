/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
 */

import HTMLElement from './HTMLElement'

type HTMLTableCellElementOptions = {|
  tagName: 'td' | 'th',
|}

export default class HTMLTableCellElement extends HTMLElement {
  constructor({tagName}: HTMLTableCellElementOptions) {
    super({tagName})
    // TODO: implement properties
  }

  // TODO: implement methods
}
