/**
 * @format
 */

const {containsMethods} = require('./utils')

const TOUCH_EVENT_HANDLERS = [
  'ontouchstart',
  'ontouchend',
  'ontouchmove',
  'ontouchenter',
  'ontouchleave',
  'ontouchcancel',
]

module.exports = function toImplementTouchEventHandlers(received) {
  const properties = Object.keys(received)
  const pass = TOUCH_EVENT_HANDLERS
    .every(property => properties.includes(property))

  return {
    message: () => {
      return pass
        ? 'expected not to implement TouchEventHandlers'
        : 'expected to implement TouchEventHandlers'
    },
    pass,
  }
}
