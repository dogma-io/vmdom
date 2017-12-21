/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NodeList
 */

function isPropertyNumber(property: string): boolean {
  return typeof property === 'string' && /^(\d+)$/.test(property)
}

export default class NodeList {
  constructor(nodes: Array<*>) {
    return new Proxy(this, {
      get(target, property) {
        if (property === 'length') {
          return nodes.length
        }

        if (isPropertyNumber(property)) {
          return nodes[parseInt(property)]
        }

        // $FlowFixMe - Flow doesn't like referencing arbitrary props on target
        return target[property]
      },
      set(target, property, value) {
        // length and nodes are read-only but the browser silently fails when
        // trying to set them, simply returning the attempted new value.
        if (property === 'length' || isPropertyNumber(property)) {
          return value
        }

        // $FlowFixMe - Flow doesn't like adding arbitrary props to target
        return (target[property] = value)
      },
    })
  }
}
