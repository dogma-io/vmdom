/**
 * @flow
 * @format
 */

/* global EventListener */

export function defineEventHandlers(target: *, properties: Array<string>) {
  const eventHandlers: {[key: string]: ?EventListener} = {}

  properties.forEach((property: string) => {
    Object.defineProperty(target, property, {
      enumerable: true,
      get(): ?EventListener {
        return eventHandlers[property] || null
      },
      set(newValue: *): any { // eslint-disable-line
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
  options?: {|
    args?: Array<*>,
    enumerable?: boolean,
  |},
) {
  let instance

  const forSureArgs: Array<*> = (options && options.args) || []

  if (!target._isLoaded) {
    Object.defineProperty(target, `_isLoaded`, {
      enumerable: false,
      value: {},
      writable: true,
    })
  }

  target._isLoaded[property] = false

  let enumerable = true

  if (options && 'enumerable' in options) {
    enumerable = options.enumerable
  }

  Object.defineProperty(target, property, {
    enumerable,

    get(): * {
      if (!instance) {
        instance = new Klass(...forSureArgs)
        target._isLoaded[property] = true
      }

      return instance
    },

    set(newValue: *): any { // eslint-disable-line
      return newValue
    },
  })
}

export function lazilyLoadModuleAsProp(
  target: *,
  property: string,
  modulePath: string,
  require: (modulePath: string) => *,
) {
  Object.defineProperty(target, property, {
    get(): * {
      // $FlowFixMe - Flow doesn't like dynamic require statements
      return require(modulePath)
    },

    set(newValue: *): * {
      return newValue
    },
  })
}
