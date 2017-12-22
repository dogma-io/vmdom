/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element
 */

import nodeMixin from './mixins/Node'
import {defineEventHandlers} from './utils'

type ElementAttributes = {[key: string]: string}

type ElementOptions = {|
  tagName: string,
|}

export const ELEMENT_EVENT_HANDLERS = [
  'ongotpointercapture',
  'onlostpointercapture',
]

class Element {
  _attributes: ElementAttributes
  _namespaceAttributes: {[key: string]: ElementAttributes}
  tagName: string

  constructor({tagName}: ElementOptions) {
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

  getAttribute(name: *) {
    const key = encodeURIComponent(name).toLowerCase()
    const value = this._attributes[key]
    return value === undefined ? null : value
  }

  getAttributeNames() {
    return Object.keys(this._attributes).concat(
      Object.keys(this._namespaceAttributes).reduce((names, namespace) => {
        return names.concat(Object.keys(this._namespaceAttributes[namespace]))
      }, []),
    )
  }

  getAttributeNS(namespace: *, name: *) {
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
  // TODO: implement getElementsByTagNameNS

  hasAttribute(name: *) {
    const key = encodeURIComponent(name).toLowerCase()
    return key in this._attributes
  }

  hasAttributeNS(namespace: *, name: *) {
    const key = encodeURIComponent(name).toLowerCase()

    if (!(namespace in this._namespaceAttributes)) {
      return false
    }

    return key in this._namespaceAttributes[namespace]
  }

  hasAttributes() {
    if (Object.keys(this._attributes).length) {
      return true
    }

    return (
      Object.keys(this._namespaceAttributes).filter(namespace => {
        return Object.keys(this._namespaceAttributes[namespace]).length !== 0
      }).length !== 0
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

export default nodeMixin(Element)
