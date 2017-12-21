/**
 * @format
 */

const {containsMethods} = require('./utils')

module.exports = function toImplementWindowOrWorkerGlobalScope(received) {
  // TODO: ensure properties exist as well

  const pass = containsMethods(
    received,
    [
      'atob',
      'btoa',
      'clearInterval',
      'clearTimeout',
      // TODO: uncomment once implemented
      // 'createImageBitmap',
      'fetch',
      'setInterval',
      'setTimeout',
    ],
  )

  return {
    message: () => {
      return pass
        ? 'expected not to implement WindowOrWorkerGlobalScope'
        : 'expected to implement WindowOrWorkerGlobalScope'
    },
    pass,
  }
}
