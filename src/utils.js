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

  Object.defineProperty(target, property, {
    enumerable: true,

    get() {
      if (!instance) {
        instance = new Klass(...(args || []))
      }

      return instance
    },

    set(newValue) {
      return newValue
    },
  })
}
