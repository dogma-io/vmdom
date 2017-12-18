/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList
 */

export default class NodeList {
  length: number

  constructor(nodes: Array<*>) {
    // $FlowFixMe
    Object.defineProperty(this, 'length', {
      enumerable: false,

      get() {
        return nodes.length
      },

      set(newValue) {
        return newValue
      },
    })
  }
}
