/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node
 */

import DOMException from './DOMException'
import eventTargetMixin from './mixins/EventTarget'
import NodeList from './NodeList'

class Node {
  appendChild: (child: Node) => Node
  childNodes: NodeList
  contains: (otherNode: Node) => boolean
  hasChildNodes: () => boolean
  insertBefore: (newNode: Node, referencedNode: Node) => Node
  isSameNode: (other: Node) => boolean
  normalize: () => void
  removeChild: (child: Node) => Node
  replaceChild: (newChild: Node, oldChild: Node) => Node

  constructor() {
    let nodeList

    const childNodes = []

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      appendChild: {
        enumerable: false,
        value: appendChild.bind(null, childNodes),
        writable: false,
      },
      childNodes: {
        enumerable: false,

        get(): NodeList {
          if (!nodeList) {
            nodeList = new NodeList(childNodes)
          }

          return nodeList
        },

        set(newValue: *): * {
          return newValue
        },
      },
      // TODO: implement cloneNode()
      // TODO: implement compareDocumentPosition()
      contains: {
        enumerable: false,
        value: contains.bind(this, childNodes),
        writable: false,
      },
      // TODO: implement getRootNode()
      hasChildNodes: {
        enumerable: false,
        value: hasChildNodes.bind(null, childNodes),
        writable: false,
      },
      insertBefore: {
        enumerable: false,
        value: insertBefore.bind(null, childNodes),
        writable: false,
      },
      // TODO: implement isDefaultNamespace()
      // TODO: implement isEqualNode()
      isSameNode: {
        enumerable: false,
        value: isSameNode.bind(this),
        writable: false,
      },
      // TODO: implement lookupPrefix()
      // TODO: implement lookupNamespaceURI()
      normalize: {
        enumerable: false,
        value: normalize.bind(null, childNodes),
        writable: false,
      },
      removeChild: {
        enumerable: false,
        value: removeChild.bind(null, childNodes),
        writable: false,
      },
      replaceChild: {
        enumerable: false,
        value: replaceChild.bind(null, childNodes),
        writable: false,
      },
    })
  }

  static destroy(instance: *) {
    for (let i = instance.childNodes.length - 1; i >= 0; i--) {
      const child = instance.childNodes[i]
      child.constructor.destroy(child)

      // TODO: The below isn't very efficient, it'd be better if we could just
      // splice the array after iterating over it but that would mean we need
      // access to the childNodes variable defined in the Node's constructor
      instance.removeChild(child)
    }
  }
}

type ChildNodes = Array<Node>

const appendChild = (childNodes: ChildNodes, child: Node): Node => {
  // TODO: if child is already in the document tree, remove it from it's
  // current location

  // TODO: make sure to handle DocumentFragment's properly

  childNodes.push(child)

  return child
}

function contains(childNodes: ChildNodes, otherNode: Node): boolean {
  if (otherNode === this) {
    return true
  }

  for (let i = childNodes.length - 1; i >= 0; i--) {
    if (childNodes[i] === otherNode) {
      return true
    }

    if (childNodes[i].contains(otherNode)) {
      return true
    }
  }

  return false
}

const hasChildNodes = (childNodes: ChildNodes): boolean => {
  return childNodes.length !== 0
}

const insertBefore = (
  childNodes: ChildNodes,
  newNode: Node,
  referencedNode: Node,
): Node => {
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
      ? childNodes.length
      : childNodes.indexOf(referencedNode)

  if (index === -1) {
    throw new DOMException(
      "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.",
    )
  }

  // TODO: if newNode is already in document remove it from original location

  if (newNode instanceof DocumentFragment) {
    const newChildren = Array.from(newNode.childNodes)
    childNodes.splice(index, 0, ...newChildren)
    newChildren.forEach(newNode.removeChild)
  } else {
    childNodes.splice(index, 0, newNode)
  }

  return newNode
}

function isSameNode(other: Node): boolean {
  return this === other
}

const normalize = (childNodes: ChildNodes) => {
  for (let i = childNodes.length - 1; i >= 0; i--) {
    const node = childNodes[i]

    node.normalize()

    const prevNode = childNodes[i - 1]

    if (node instanceof CharacterData) {
      if (prevNode instanceof CharacterData) {
        prevNode.appendData(node.data)
        childNodes.splice(i, 1)
      } else if (node.data === '') {
        childNodes.splice(i, 1)
      }
    }
  }
}

const removeChild = (childNodes: ChildNodes, child: Node): Node => {
  if (!(child instanceof Node)) {
    throw new TypeError(
      "Failed to execute 'removeChild' on 'Node': parameter 1 is not of type 'Node'.",
    )
  }

  const index = childNodes.indexOf(child)

  if (index === -1) {
    throw new DOMException(
      "Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.",
    )
  }

  childNodes.splice(index, 1)

  return child
}

const replaceChild = (
  childNodes: ChildNodes,
  newChild: Node,
  oldChild: Node,
): Node => {
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

  const index = childNodes.indexOf(oldChild)

  if (index === -1) {
    throw new DOMException(
      "Failed to execute 'replaceChild' on 'Node': The node to be replaced is not a child of this node.",
    )
  }

  childNodes.splice(index, 1, newChild)

  return oldChild
}

const NodeWithEventTargetMixin = eventTargetMixin(Node)

/**
 * NOTE: this must live in the same module as the Node class to prevent circular
 * dependency issues.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CharacterData
 */
export class CharacterData extends NodeWithEventTargetMixin {
  // TODO: implement NonDocumentTypeChildNode interface
  appendData: (newData: *) => void
  data: string
  deleteData: (start: number, end: number) => void
  insertData: (start: number, newData: *) => void
  length: number
  replaceData: (start: number, end: number, newData: *) => void
  substringData: (start: number, end: number) => string

  constructor(data: *) {
    super()

    data = `${data}`

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      appendData: {
        enumerable: false,
        value: (newData: *) => {
          data = data + `${newData}`
        },
        writable: false,
      },
      data: {
        enumerable: false,
        get(): string {
          return data
        },
        set(newValue: *): * {
          return newValue
        },
      },
      deleteData: {
        enumerable: false,
        value: (start: number, end: number) => {
          data = data.substr(0, start) + data.substr(end)
        },
        writable: false,
      },
      insertData: {
        enumerable: false,
        value: (start: number, newData: *) => {
          data = data.substr(0, start) + `${newData}` + data.substr(start)
        },
        writable: false,
      },
      length: {
        enumerable: false,
        get(): number {
          return data.length
        },
        set(newValue: *): * {
          return newValue
        },
      },
      replaceData: {
        enumerable: false,
        value: (start: number, end: number, newData: *) => {
          data = data.substr(0, start) + `${newData}` + data.substr(end)
        },
        writable: false,
      },
      substringData: {
        enumerable: false,
        value: (start: number, end: number): string => {
          return data.substr(start, end)
        },
        writable: false,
      },
    })
  }
}

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
