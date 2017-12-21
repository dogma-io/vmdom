/**
 * @format
 */

const {containsMethods} = require('./utils')

module.exports = function toImplementNode(received) {
  const pass = containsMethods(
    received,
    [
      'appendChild',
      // TODO: uncomment once implemented
      // 'cloneNode',
      // 'compareDocumentPosition',
      // 'contains',
      // 'getRootNode',
      // 'hasChildNodes',
      // 'insertBefore',
      // 'isDefaultNamespace',
      // 'isEqualNode',
      // 'isSameNode',
      // 'lookupPrefix',
      // 'lookupNamespaceURI',
      // 'normalize',
      // 'removeChild',
      // 'replaceChild',
    ],
  )

  return {
    message: () => {
      return pass
        ? 'expected not to implement Node'
        : 'expected to implement Node'
    },
    pass,
  }
}
