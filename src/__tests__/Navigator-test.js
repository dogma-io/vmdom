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

  it('should not allow userAgent to be overwritten', () => {
    expect((instance.userAgent = 'foo')).toBe('foo')
    expect(instance.userAgent).toBe(UA)
  })

  describe('getVRDisplays()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.getVRDisplays = 'foo'
      }).toThrow(TypeError)
    })

    it('should resolve with no devices since virtual browser does not have VR devices connected to it', () => {
      return instance.getVRDisplays().then(result => {
        expect(result).toEqual([])
      })
    })
  })

  describe('vibrate()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.vibrate = 'foo'
      }).toThrow(TypeError)
    })

    it('should return false since virtual browser has no physical device to vibrate', () => {
      expect(instance.vibrate(100)).toBe(false)
    })
  })
})
