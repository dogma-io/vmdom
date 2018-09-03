/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

import Node from './Node'
import {defineEventHandlers} from './utils'

// eslint-disable-next-line flowtype/require-exact-type
type ElementAttributes = {[key: string]: string}

type ElementOptions = {|
  tagName: string,
|}

// eslint-disable-next-line flowtype/require-exact-type
type NamespaceAttributes = {[key: string]: ElementAttributes}

export const ELEMENT_EVENT_HANDLERS = [
  'ongotpointercapture',
  'onlostpointercapture',
]

const getAttribute = (attributes: ElementAttributes, name: *): ?string => {
  const key = encodeURIComponent(name).toLowerCase()
  const value = attributes[key]
  return value === undefined ? null : value
}

const getAttributeNames = (
  attributes: ElementAttributes,
  namespaceAttributes: NamespaceAttributes,
): Array<string> => {
  const attributeNames: Array<string> = Object.keys(attributes)
  const namespaces: Array<string> = Object.keys(namespaceAttributes)

  namespaces.forEach((namespace: string) => {
    const namespaceAttributeNames: Array<string> = Object.keys(
      namespaceAttributes[namespace],
    )
    attributeNames.push(...namespaceAttributeNames)
  })

  return attributeNames
}

const getAttributeNS = (
  namespaceAttributes: NamespaceAttributes,
  namespace: *,
  name: *,
): ?string => {
  if (!(namespace in namespaceAttributes)) {
    return null
  }

  const key = encodeURIComponent(name).toLowerCase()
  const value = namespaceAttributes[namespace][key]
  return value === undefined ? null : value
}

function getElementsByTagName(tagName: string): Array<*> {
  // TODO: make it so this check doesn't happen a bunch in a deep tree due to
  // recursive calls to method
  tagName = tagName.toLowerCase()

  // TODO: use an HTMLCollection instead of an array to make it a live list
  const elements = []

  for (let i = 0; i < this.childNodes.length; i++) {
    const childNode = this.childNodes[i]

    if (childNode.tagName === tagName) {
      elements.push(childNode)
    }

    if (childNode instanceof Element) {
      const nestedElements = childNode.getElementsByTagName(tagName)
      elements.push(...nestedElements)
    }
  }

  return elements
}

const hasAttribute = (attributes: ElementAttributes, name: *): boolean => {
  const key = encodeURIComponent(name).toLowerCase()
  return key in attributes
}

const hasAttributeNS = (
  namespaceAttributes: NamespaceAttributes,
  namespace: *,
  name: *,
): boolean => {
  const key = encodeURIComponent(name).toLowerCase()

  if (!(namespace in namespaceAttributes)) {
    return false
  }

  return key in namespaceAttributes[namespace]
}

const hasAttributes = (
  attributes: ElementAttributes,
  namespaceAttributes: NamespaceAttributes,
): boolean => {
  if (Object.keys(attributes).length) {
    return true
  }

  return (
    Object.keys(namespaceAttributes).filter(
      (namespace: string): boolean => {
        return Object.keys(namespaceAttributes[namespace]).length !== 0
      },
    ).length !== 0
  )
}

const removeAttribute = (attributes: ElementAttributes, name: *) => {
  const key = encodeURIComponent(name).toLowerCase()
  delete attributes[key]
}

const removeAttributeNS = (
  namespaceAttributes: NamespaceAttributes,
  namespace: *,
  name: *,
) => {
  if (namespace in namespaceAttributes) {
    const key = encodeURIComponent(name).toLowerCase()
    delete namespaceAttributes[namespace][key]
  }
}

const setAttribute = (attributes: ElementAttributes, name: *, value: *) => {
  const key = encodeURIComponent(name).toLowerCase()
  attributes[key] = `${value}`
}

const setAttributeNS = (
  namespaceAttributes: NamespaceAttributes,
  namespace: *,
  name: *,
  value: *,
) => {
  if (!(namespace in namespaceAttributes)) {
    namespaceAttributes[namespace] = {}
  }

  const key = encodeURIComponent(name).toLowerCase()
  namespaceAttributes[namespace][key] = `${value}`
}

export default class Element extends Node {
  getAttribute: (name: *) => ?string
  getAttributeNames: () => Array<string>
  getAttributeNS: (namespace: *, name: *) => ?string
  getElementsByTagName: (tagName: string) => Array<*>
  hasAttribute: (name: *) => boolean
  hasAttributeNS: (namespace: *, name: *) => boolean
  hasAttributes: () => boolean
  innerHTML: string
  removeAttribute: (name: *) => void
  removeAttributeNS: (namespace: *, name: *) => void
  setAttribute: (name: *, value: *) => void
  setAttributeNS: (namespace: *, name: *, value: *) => void
  tagName: string

  constructor({tagName}: ElementOptions) {
    super()

    const attributes: ElementAttributes = {}
    const namespaceAttributes: NamespaceAttributes = {}

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      getAttribute: {
        enumerable: false,
        value: getAttribute.bind(null, attributes),
        writable: false,
      },
      getAttributeNames: {
        enumerable: false,
        value: getAttributeNames.bind(null, attributes, namespaceAttributes),
        writable: false,
      },
      // TODO: implement getAttributeNode
      // TODO: implement getAttributeNodeNS
      getAttributeNS: {
        enumerable: false,
        value: getAttributeNS.bind(null, namespaceAttributes),
        writable: false,
      },
      // TODO: implement getBoundingClientRect
      // TODO: implement getClientRects
      // TODO: implement getElementsByClassName
      getElementsByTagName: {
        enumerable: false,
        value: getElementsByTagName.bind(this),
        writable: false,
      },
      // TODO: implement getElementsByTagNameNS
      hasAttribute: {
        enumerable: false,
        value: hasAttribute.bind(null, attributes),
        writable: false,
      },
      hasAttributeNS: {
        enumerable: false,
        value: hasAttributeNS.bind(null, namespaceAttributes),
        writable: false,
      },
      hasAttributes: {
        enumerable: false,
        value: hasAttributes.bind(null, attributes, namespaceAttributes),
        writable: false,
      },
      innerHTML: {
        enumerable: false,
        get(): string {
          // TODO: return tree as a string
          return ''
        },
        set(value: string): string {
          // TODO: parse value and update tree
          return value
        },
      },
      // TODO: implement querySelector
      // TODO: implement querySelectorAll
      // TODO: implement releasePointerCapture
      // TODO: implement remove
      removeAttribute: {
        enumerable: false,
        value: removeAttribute.bind(null, attributes),
        writable: false,
      },
      // TODO: implement removeAttributeNode
      removeAttributeNS: {
        enumerable: false,
        value: removeAttributeNS.bind(null, namespaceAttributes),
        writable: false,
      },
      setAttribute: {
        enumerable: false,
        value: setAttribute.bind(null, attributes),
        writable: false,
      },
      // TODO: implement setAttributeNode
      // TODO: implement setAttributeNodeNS
      setAttributeNS: {
        enumerable: false,
        value: setAttributeNS.bind(null, namespaceAttributes),
        writable: false,
      },
      // TODO: implement setcapture
      // TODO: implement setPointerCapture
      tagName: {
        enumerable: false,
        value: tagName,
        writable: false,
      },
    })

    defineEventHandlers(this, ELEMENT_EVENT_HANDLERS)

    // TODO: implement standard properties
  }
}
