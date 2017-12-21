/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
 */

import HTMLElement from './HTMLElement'

type HTMLTableSectionElementOptions = {|
  tagName: 'tbody' | 'tfoot' | 'thead',
|}

export default class HTMLTableSectionElement extends HTMLElement {
  constructor({tagName}: HTMLTableSectionElementOptions) {
    super({tagName})
    // TODO: implement properties
  }

  // TODO: implement methods
}
