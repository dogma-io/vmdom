import DOMParser from '../DOMParser'

describe('DOMParser', () => {
  let instance

  beforeEach(() => {
    instance = new DOMParser()
  })

  describe('parseFromString()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.parseFromString = 'foo'
      }).toThrow(TypeError)
    })
  })
})
