jest.mock('../Element')

import Document from '../Document'
import HTMLElement from '../HTMLElement'

describe('Document', () => {
  let instance

  beforeEach(() => {
    instance = new Document()
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementNode()
    expect(instance).toHaveEnumerables([])
  })

  it('should not instantiate classes for lazily load properties', () => {
    expect(HTMLElement).not.toHaveBeenCalled()
  })

  describe('when documentElement property accessed', () => {
    let documentElement

    beforeEach(() => {
      documentElement = instance.documentElement
    })

    it('should instantiate document property', () => {
      expect(HTMLElement).toHaveBeenCalledTimes(1)
      expect(documentElement).toBeInstanceOf(HTMLElement)
    })

    it('should return same instance when accessed a second time', () => {
      expect(instance.documentElement).toBe(documentElement)
    })
  })
})
