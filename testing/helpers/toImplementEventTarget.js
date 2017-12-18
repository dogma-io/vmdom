/**
 * @format
 */

const {containsMethods} = require('./utils')

module.exports = function toImplementEventTarget(received) {
  const pass = containsMethods(
    received,
    ['addEventListener', 'dispatchEvent', 'removeEventListener'],
  )

  return {
    message: () => {
      return pass
        ? 'expected not to implement EventTarget'
        : 'expected to implement EventTarget'
    },
    pass,
  }
}
