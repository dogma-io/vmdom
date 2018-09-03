/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */

// eslint-disable-next-line flowtype/require-exact-type
type Items = {[key: string]: string}

const clear = (items: Items) => {
  Object.keys(items).forEach((key: string) => {
    delete items[key]
  })
}

const getItem = (items: Items, key: *): ?string => {
  return items[encodeURIComponent(key)]
}

const key = (items: Items, index: number): ?string => {
  const key = Object.keys(items)[index]
  return key === undefined ? null : decodeURIComponent(key)
}

const removeItem = (items: Items, key: *) => {
  delete items[encodeURIComponent(key)]
}

const setItem = (items: Items, key: *, value: *) => {
  items[encodeURIComponent(key)] = `${value}`
}

// TODO: Object.keys(storageInstance) should return all keys in items

export default class Storage {
  clear: () => void
  getItem: (key: *) => ?string
  key: (index: number) => ?string
  length: number
  removeItem: (key: *) => void
  setItem: (key: *, value: *) => void

  constructor() {
    const items: Items = {}

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      clear: {
        enumerable: false,
        value: clear.bind(null, items),
        writable: false,
      },
      getItem: {
        enumerable: false,
        value: getItem.bind(null, items),
        writable: false,
      },
      key: {
        enumerable: false,
        value: key.bind(null, items),
        writable: false,
      },
      length: {
        enumerable: false,
        get(): number {
          return Object.keys(items).length
        },
        set(newValue: *): * {
          return newValue
        },
      },
      removeItem: {
        enumerable: false,
        value: removeItem.bind(null, items),
        writable: false,
      },
      setItem: {
        enumerable: false,
        value: setItem.bind(null, items),
        writable: false,
      },
    })
  }
}
