/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation
 */

import Document from './Document'
import DocumentType from './DocumentType'

const createDocument = (
  namespaceURI: string,
  qualifiedName: string,
  documentType?: DocumentType,
) => {
  // TODO: implement
}

const createDocumentType = (
  qualifiedName: string,
  publicId: string,
  systemId: string,
): DocumentType => {
  return new DocumentType(qualifiedName, publicId, systemId)
}

const createHTMLDocument = (title: string): Document => {
  return new Document({
    includeBody: true,
    includeHead: true,
  })
}

const hasFeature = (): boolean => {
  return true
}

export default class DOMImplementation {
  createDocument: (
    namespaceURI: string,
    qualifiedName: string,
    documentType?: DocumentType,
  ) => void
  createDocumentType: (
    qualifiedName: string,
    publicId: string,
    systemId: string,
  ) => DocumentType
  createHTMLDocument: (title: string) => Document
  hasFeature: () => boolean

  constructor() {
    Object.defineProperties(this, {
      createDocument: {
        enumerable: false,
        value: createDocument,
        writable: false,
      },
      createDocumentType: {
        enumerable: false,
        value: createDocumentType,
        writable: false,
      },
      createHTMLDocument: {
        enumerable: false,
        value: createHTMLDocument,
        writable: false,
      },
      hasFeature: {
        enumerable: false,
        value: hasFeature,
        writable: false,
      },
    })
  }
}
