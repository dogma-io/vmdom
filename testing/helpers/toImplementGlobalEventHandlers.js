/**
 * @format
 */

const {containsMethods} = require('./utils')

const GLOBAL_EVENT_HANDLERS = [
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

module.exports = function toImplementGlobalEventHandlers(received) {
  const properties = Object.keys(received)
  const pass = GLOBAL_EVENT_HANDLERS
    .every(property => properties.includes(property))

  return {
    message: () => {
      return pass
        ? 'expected not to implement GlobalEventHandlers'
        : 'expected to implement GlobalEventHandlers'
    },
    pass,
  }
}
