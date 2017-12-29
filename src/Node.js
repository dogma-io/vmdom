/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */

import DOMException from './DOMException'
import eventTargetMixin from './mixins/EventTarget'
import NodeList from './NodeList'

class Node {
  _childNodes: Array<Node>
  childNodes: NodeList

  constructor() {
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

  removeChild(child: Node) {
    if (!(child instanceof Node)) {
      throw new TypeError(
        "Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.",
      )
    }

    const index = this._childNodes.indexOf(child)

    if (index === -1) {
      throw new DOMException(
        "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
      )
    }

    this._childNodes.splice(index, 1)

    return child
  }

  // TODO: implement replaceChild()
}

export default eventTargetMixin(Node)
