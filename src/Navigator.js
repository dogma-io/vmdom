/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator
 */

export default class Navigator {
  userAgent: string

  constructor(userAgent: string) {
    Object.defineProperties(this, {
      userAgent: {
        enumerable: false,
        value: userAgent,
        writable: false,
      },
    })

    // TODO: implement standard properties
  }

  getVRDisplays(): Promise<Array<*>> {
    return Promise.resolve([])
  }

  // TODO: implement registerContentHandler
  // TODO: implement registerProtocolHandler
  // TODO: implement requestMediaKeySystemAccess
  // TODO: implement sendBeacon

  vibrate(pattern: number | Array<number>): boolean {
    return false
  }
}
