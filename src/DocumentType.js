/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DocumentType
 */

import Node from './Node'

export default class DocumentType extends Node {
  constructor(name: string, publicId: string, systemId: string) {
    super()

    Object.defineProperties(this, {
      // TODO: implement entities property
      // TODO: implement internalSubset property
      name: {
        enumerable: false,
        value: name,
        writable: false,
      },
      // TODO: implement notations property
      publicId: {
        enumerable: false,
        value: publicId,
        writable: false,
      },
      systemId: {
        enumerable: false,
        value: systemId,
        writable: false,
      },
    })
  }
}
