import Navigator from '../Navigator'

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

describe('Navigator', () => {
  let instance

  beforeEach(() => {
    instance = new Navigator(UA)
  })

  it('should return passed in userAgent for userAgent property', () => {
    expect(instance.userAgent).toBe(UA)
  })

  it('getVRDisplays() should resolve with no devices since virtual browser does not have VR devices connected to it', () => {
    return instance.getVRDisplays().then(result => {
      expect(result).toEqual([])
    })
  })

  it('vibrate() should return false since virtual browser has no physical device to vibrate', () => {
    expect(instance.vibrate(100)).toBe(false)
  })
})
