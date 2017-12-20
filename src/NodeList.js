/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList
 */

export default class NodeList {
  constructor(nodes: Array<*>) {
    return new Proxy(this, {
      get(target, property) {
        if (property === 'length') {
          return nodes.length
        }

        if (typeof property === 'string' && /^(\d+)$/.test(property)) {
          return nodes[parseInt(property)]
        }

        return undefined
      },
    })
  }
}
