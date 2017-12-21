/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
 */

import HTMLElement from './HTMLElement'

type HTMLMediaElementOptions = {|
  tagName: 'audio' | 'video',
|}

export default class HTMLMediaElement extends HTMLElement {
  constructor({tagName}: HTMLMediaElementOptions) {
    super({tagName})
    // TODO: implement properties
  }

  // TODO: implement methods
}
