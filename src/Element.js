/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

import Node from './Node'
import {defineEventHandlers} from './utils'

type ElementAttributes = {[key: string]: string}

type ElementOptions = {|
  tagName: string,
|}

export const ELEMENT_EVENT_HANDLERS = [
  'ongotpointercapture',
  'onlostpointercapture',
]

export default class Element extends Node {
  _attributes: ElementAttributes
  _namespaceAttributes: {[key: string]: ElementAttributes}
  tagName: string

  constructor({tagName}: ElementOptions) {
    super()

    Object.defineProperties(this, {
      _attributes: {
        enumerable: false,
        value: {},
        writable: false,
      },
      _namespaceAttributes: {
        enumerable: false,
        value: {},
        writable: false,
      },
      tagName: {
        enumerable: false,
        value: tagName,
        writable: false,
      },
    })

    defineEventHandlers(this, ELEMENT_EVENT_HANDLERS)

    // TODO: implement standard properties
  }

  getAttribute(name: *): ?string {
    const key = encodeURIComponent(name).toLowerCase()
    const value = this._attributes[key]
    return value === undefined ? null : value
  }

  getAttributeNames(): Array<string> {
    const attributeNames: Array<string> = Object.keys(this._attributes)
    const namespaces: Array<string> = Object.keys(this._namespaceAttributes)

    namespaces.forEach((namespace: string) => {
      const namespaceAttributes: Array<string> = Object.keys(
        this._namespaceAttributes[namespace],
      )
      attributeNames.push(...namespaceAttributes)
    })

    return attributeNames
  }

  getAttributeNS(namespace: *, name: *): ?string {
    if (!(namespace in this._namespaceAttributes)) {
      return null
    }

    const key = encodeURIComponent(name).toLowerCase()
    const value = this._namespaceAttributes[namespace][key]
    return value === undefined ? null : value
  }

  // TODO: implement getAttributeNode
  // TODO: implement getAttributeNodeNS
  // TODO: implement getBoundingClientRect
  // TODO: implement getClientRects
  // TODO: implement getElementsByClassName
  // TODO: implement getElementsByTagName

  getElementsByTagName(tagName: string): Array<*> {
    // TODO: make it so this check doesn't happen a bunch in a deep tree due to
    // recursive calls to method
    tagName = tagName.toLowerCase()

    // TODO: use an HTMLCollection instead of an array to make it a live list
    const elements = []

    for (let i = 0; i < this._childNodes.length; i++) {
      const childNode = this._childNodes[i]

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

  // TODO: implement getElementsByTagNameNS

  hasAttribute(name: *): boolean {
    const key = encodeURIComponent(name).toLowerCase()
    return key in this._attributes
  }

  hasAttributeNS(namespace: *, name: *): boolean {
    const key = encodeURIComponent(name).toLowerCase()

    if (!(namespace in this._namespaceAttributes)) {
      return false
    }

    return key in this._namespaceAttributes[namespace]
  }

  hasAttributes(): boolean {
    if (Object.keys(this._attributes).length) {
      return true
    }

    return (
      Object.keys(this._namespaceAttributes).filter(
        (namespace: string): boolean => {
          return Object.keys(this._namespaceAttributes[namespace]).length !== 0
        },
      ).length !== 0
    )
  }

  // TODO: implement querySelector
  // TODO: implement querySelectorAll
  // TODO: implement releasePointerCapture
  // TODO: implement remove

  removeAttribute(name: *) {
    const key = encodeURIComponent(name).toLowerCase()
    delete this._attributes[key]
  }

  removeAttributeNS(namespace: *, name: *) {
    if (namespace in this._namespaceAttributes) {
      const key = encodeURIComponent(name).toLowerCase()
      delete this._namespaceAttributes[namespace][key]
    }
  }

  // TODO: implement removeAttributeNode

  setAttribute(name: *, value: *) {
    const key = encodeURIComponent(name).toLowerCase()
    this._attributes[key] = `${value}`
  }

  setAttributeNS(namespace: *, name: *, value: *) {
    if (!(namespace in this._namespaceAttributes)) {
      this._namespaceAttributes[namespace] = {}
    }

    const key = encodeURIComponent(name).toLowerCase()
    this._namespaceAttributes[namespace][key] = `${value}`
  }

  // TODO: implement setAttributeNode
  // TODO: implement setAttributeNodeNS
  // TODO: implement setcapture
  // TODO: implement setPointerCapture
}
