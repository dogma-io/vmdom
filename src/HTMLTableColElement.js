/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableColElement
 */

import HTMLElement from './HTMLElement'

type HTMLTableColElementOptions = {|
  tagName: 'col' | 'colgroup',
|}

export default class HTMLTableColElement extends HTMLElement {
  constructor({tagName}: HTMLTableColElementOptions) {
    super({tagName})
    // TODO: implement properties
  }
}
