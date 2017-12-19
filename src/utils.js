/**
 * @flow
 * @format
 */

export function lazilyLoadProp(
  target: *,
  property: string,
  Klass: *,
  args?: Array<*>,
) {
  let instance

  if (!target._isLoaded) {
    Object.defineProperty(target, `_isLoaded`, {
      enumerable: false,
      value: {},
      writable: true,
    })
  }

  target._isLoaded[property] = false

  Object.defineProperty(target, property, {
    enumerable: true,

    get() {
      if (!instance) {
        instance = new Klass(...(args || []))
        target._isLoaded[property] = true
      }

      return instance
    },

    set(newValue) {
      return newValue
    },
  })
}
