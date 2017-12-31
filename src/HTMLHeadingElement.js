/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
 */

import HTMLElement from './HTMLElement'

type HTMLHeadingElementOptions = {|
  tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
|}

export default class HTMLHeadingElement extends HTMLElement {
  constructor({tagName}: HTMLHeadingElementOptions) {
    super({tagName})
  }
}
