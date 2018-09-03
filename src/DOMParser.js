/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 */

import Document from './Document'

const DOCTYPE_PATTERN = /<!doctype/i
const HTML_TYPE: 'text/html' = 'text/html'
const SVG_TYPE: 'image/svg+xml' = 'image/svg+xml'
const XML_TYPE: 'application/xml' = 'application/xml'

type Type = typeof HTML_TYPE | typeof SVG_TYPE | typeof XML_TYPE

const parseFromString = (data: string, type: Type): Document => {
  switch (type.toLowerCase().trim()) {
    case HTML_TYPE: {
      // TODO: this shouldn't reference global document if possible. Otherwise
      // the type needs correct to be our Document not the type provided by Flow
      const doc = document.implementation.createHTMLDocument('')
      const {body, documentElement} = doc

      if (DOCTYPE_PATTERN.test(data)) {
        if (documentElement) {
          documentElement.innerHTML = data
        }
      } else if (body) {
        body.innerHTML = data
      }

      return (doc: any) // eslint-disable-line
    }

    case SVG_TYPE:
      throw new Error('DOMParser: SVG parsing not implemented')

    case XML_TYPE:
      throw new Error('DOMParser: XML parsing not implemented')

    default:
      throw new Error('DOMParser: invalid type not implement')
  }
}

export default class DOMParser {
  parseFromString: (data: string, type: Type) => Document

  constructor() {
    Object.defineProperty(this, 'parseFromString', {
      enumerable: false,
      value: parseFromString,
      writable: false,
    })
  }
}
