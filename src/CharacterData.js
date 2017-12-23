/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import nodeMixin from './mixins/Node'

// TODO: implement NonDocumentTypeChildNode interface

class CharacterData {
  _data: string
  data: string
  length: number

  constructor(data: *) {
    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      _data: {
        enumerable: false,
        value: `${data}`,
        writable: true,
      },
      data: {
        enumerable: false,
        get() {
          return this._data
        },
        set(newValue) {
          return newValue
        },
      },
      length: {
        enumerable: false,
        get() {
          return this._data.length
        },
        set(newValue) {
          return newValue
        },
      },
    })
  }

  appendData(data: *) {
    this._data = this.data + `${data}`
  }

  deleteData(start: number, end: number) {
    this._data = this.data.substr(0, start) + this.data.substr(end)
  }

  insertData(start: number, data: *) {
    this._data =
      this.data.substr(0, start) + `${data}` + this.data.substr(start)
  }

  replaceData(start: number, end: number, data: *) {
    this._data = this.data.substr(0, start) + `${data}` + this.data.substr(end)
  }

  substringData(start: number, end: number) {
    return this.data.substr(start, end)
  }
}

export default nodeMixin(CharacterData)
