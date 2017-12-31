/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 */

import HTMLMediaElement from './HTMLElement'

export default class HTMLAudioElement extends HTMLMediaElement {
  constructor() {
    super({tagName: 'audio'})
  }
}
