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

  hasChildNodes() {
    return this._childNodes.length !== 0
  }

  insertBefore(newNode: Node, referencedNode: Node) {
    if (!(newNode instanceof Node)) {
      throw new TypeError(
        "Failed to execute 'insertBefore' on 'Node': parameter 1 is not of type 'Node'.",
      )
    }

    if (referencedNode !== null && !(referencedNode instanceof Node)) {
      throw new TypeError(
        "Failed to execute 'insertBefore' on 'Node': parameter 2 is not of type 'Node'.",
      )
    }

    const index =
      referencedNode === null
        ? this._childNodes.length
        : this._childNodes.indexOf(referencedNode)

    if (index === -1) {
      throw new DOMException(
        "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.",
      )
    }

    // TODO: if newNode is already in document remove it from original location

    if (newNode instanceof DocumentFragment) {
      const childNodes = newNode._childNodes.splice(0)
      this._childNodes.splice(index, 0, ...childNodes)
    } else {
      this._childNodes.splice(index, 0, newNode)
    }

    return newNode
  }

  // TODO: implement isDefaultNamespace()
  // TODO: implement isEqualNode()

  isSameNode(other: Node) {
    return this === other
  }

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

  replaceChild(newChild: Node, oldChild: Node) {
    if (!(newChild instanceof Node)) {
      throw new TypeError(
        "Failed to execute 'replaceChild' on 'Node': parameter 1 is not of type 'Node'.",
      )
    }

    if (!(oldChild instanceof Node)) {
      throw new TypeError(
        "Failed to execute 'replaceChild' on 'Node': parameter 2 is not of type 'Node'.",
      )
    }

    const index = this._childNodes.indexOf(oldChild)

    if (index === -1) {
      throw new DOMException(
        "Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node.",
      )
    }

    this._childNodes.splice(index, 1, newChild)

    return oldChild
  }
}

const NodeWithEventTargetMixin = eventTargetMixin(Node)

/**
 * NOTE: this must live in the same module as the Node class to prevent circular
 * dependency issues.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
 */
export class DocumentFragment extends NodeWithEventTargetMixin {
  // TODO: implement ParentNode properties
  // TODO: implement method querySelector
  // TODO: implement method querySelectorAll
  // TODO: implement method getElementsById
}

export default NodeWithEventTargetMixin
