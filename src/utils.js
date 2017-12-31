/**
 * @flow
 * @format
 */

/* global EventListener */

export function defineEventHandlers(target: *, properties: Array<string>) {
  const eventHandlers: {[key: string]: EventListener} = {}

  properties.forEach(property => {
    Object.defineProperty(target, property, {
      enumerable: true,
      get() {
        return eventHandlers[property] || null
      },
      set(newValue) {
        if (typeof newValue === 'function' || newValue === null) {
          eventHandlers[property] = newValue
        }

        return newValue
      },
    })
  })
}

export function isPropertyNumber(property: string): boolean {
  return typeof property === 'string' && /^(\d+)$/.test(property)
}

export function lazilyLoadInstanceAsProp(
  target: *,
  property: string,
  Klass: *,
  args?: Array<*>,
) {
  let instance

  const forSureArgs: any = args || []

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
        instance = new Klass(...forSureArgs)
        target._isLoaded[property] = true
      }

      return instance
    },

    set(newValue) {
      return newValue
    },
  })
}

export function lazilyLoadModuleAsProp(
  target: *,
  property: string,
  modulePath: string,
  require: (modulePath: string) => any,
) {
  Object.defineProperty(target, property, {
    get() {
      // $FlowFixMe - Flow doesn't like dynamic require statements
      return require(modulePath)
    },

    set(newValue) {
      return newValue
    },
  })
}
