/**
 * @format
 */

function containsMethods(object, methods) {
  return methods.every(method => typeof object[method] === 'function')
}

module.exports = {
  containsMethods,
}
