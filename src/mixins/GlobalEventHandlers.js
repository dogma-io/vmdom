/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
 */

import {defineEventHandlers} from '../utils'

export const GLOBAL_EVENT_HANDLERS = [
  'onabort',
  'onblur',
  'onerror',
  'onfocus',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragexit',
  'ondragleave',
  'ondraover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadend',
  'onloadstart',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onwheel',
  'onpause',
  'onplay',
  'onplaying',
  'onpointerdown',
  'onpointermove',
  'onpointerup',
  'onpointercancel',
  'onpointerover',
  'onpointerout',
  'onpointerenter',
  'onpointerleave',
  'onprogress',
  'onratechange',
  'onreset',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onselectstart',
  'onselectionchange',
  'onshow',
  'onstalled',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'onvolumechange',
  'ontransitioncancel',
  'ontransitionend',
  'onwaiting',
]

export default (Klass: *) => {
  return class GlobalEventHandlers extends Klass {
    constructor(...args: any) {
      super(...args)
      defineEventHandlers(this, GLOBAL_EVENT_HANDLERS)
    }
  }
}
