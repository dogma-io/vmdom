/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */

const getVRDisplays = (): Promise<Array<*>> => {
  return Promise.resolve([])
}

const vibrate = (pattern: number | Array<number>): boolean => {
  return false
}

export default class Navigator {
  getVRDisplays: () => Promise<Array<*>>
  userAgent: string
  vibrate: (pattern: number | Array<number>) => boolean

  constructor(userAgent: string) {
    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      getVRDisplays: {
        enumerable: false,
        value: getVRDisplays,
        writable: false,
      },
      // TODO: implement registerContentHandler
      // TODO: implement registerProtocolHandler
      // TODO: implement requestMediaKeySystemAccess
      // TODO: implement sendBeacon
      userAgent: {
        enumerable: false,
        get(): string {
          return userAgent
        },
        set(newValue: *): * {
          return newValue
        },
      },
      vibrate: {
        enumerable: false,
        value: vibrate,
        writable: false,
      },
    })

    // TODO: implement standard properties
  }
}
