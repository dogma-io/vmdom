/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */

import eventTargetMixin from './EventTarget'
import NodeList from '../NodeList'

export default (Klass: *) => {
  class Node extends Klass {
    _childNodes: Array<Node>
    childNodes: NodeList

    constructor() {
      super(...arguments)

      let nodeList

      // $FlowFixMe - Flow seems to hate getters/setters over value property
      Object.defineProperties(this, {
        _childNodes: {
          enumerable: false,
          value: [],
          writable: false,
        },
        childNodes: {
          enumerable: false,

          get() {
            if (!nodeList) {
              nodeList = new NodeList(this._childNodes)
            }

            return nodeList
          },

          set(newValue) {
            return newValue
          },
        },
      })
    }

    static destroy(instance: *) {
      for (let i = instance._childNodes.length - 1; i >= 0; i--) {
        const child = instance._childNodes[i]
        child.constructor.destroy(child)
      }

      instance._childNodes.splice(0)

      if (typeof Klass.destroy === 'function') {
        Klass.destroy(instance)
      }
    }

    appendChild(child: Node) {
      // TODO: if child is already in the document tree, remove it from it's
      // current location

      // TODO: make sure to handle DocumentFragment's properly

      this._childNodes.push(child)

      return child
    }

    // TODO: implement cloneNode()
    // TODO: implement compareDocumentPosition()
    // TODO: implement contains()
    // TODO: implement getRootNode()
    // TODO: implement hasChildNodes()
    // TODO: implement insertBefore()
    // TODO: implement isDefaultNamespace()
    // TODO: implement isEqualNode()
    // TODO: implement isSameNode()
    // TODO: implement lookupPrefix()
    // TODO: implement lookupNamespaceURI()
    // TODO: implement normalize()
    // TODO: implement removeChild()
    // TODO: implement replaceChild()
  }

  return eventTargetMixin(Node)
}
