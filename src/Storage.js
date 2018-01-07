/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */

// TODO: Object.keys(storageInstance) should return all keys in _items

export default class Storage {
  _items: {[key: string]: string}

  constructor() {
    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      _items: {
        enumerable: false,
        value: {},
        writable: false,
      },
      length: {
        enumerable: false,
        get(): number {
          return Object.keys(this._items).length
        },
        set(newValue: *): * {
          return newValue
        },
      },
    })
  }

  clear() {
    Object.keys(this._items).forEach((key: string) => {
      delete this._items[key]
    })
  }

  getItem(key: *): ?string {
    return this._items[encodeURIComponent(key)]
  }

  key(index: number): ?string {
    const key = Object.keys(this._items)[index]
    return key === undefined ? null : decodeURIComponent(key)
  }

  removeItem(key: *) {
    delete this._items[encodeURIComponent(key)]
  }

  setItem(key: *, value: *) {
    this._items[encodeURIComponent(key)] = `${value}`
  }
}
