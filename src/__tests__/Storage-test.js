import Storage from '../Storage'

describe('Storage', () => {
  let instance

  beforeEach(() => {
    instance = new Storage()
  })

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow length property to be overwritten', () => {
    expect((instance.length = 20)).toBe(20)
    expect(instance.length).toBe(0)
  })

  describe('clear()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.clear = 'foo'
      }).toThrow(TypeError)
    })

    it('should not throw when nothing to clear', () => {
      expect(() => {
        instance.clear()
      }).not.toThrow()
      expect(instance).toHaveLength(0)
    })

    it('should remove all items', () => {
      instance.setItem('foo', 'bar')
      instance.setItem('baz', 'spam')
      expect(instance).toHaveLength(2)
      instance.clear()
      expect(instance).toHaveLength(0)
    })
  })

  describe('getItem()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.getItem = 'foo'
      }).toThrow(TypeError)
    })

    it('should get item by numeric key', () => {
      instance.setItem('1', 'foo')
      expect(instance.getItem(1)).toBe('foo')
    })

    it('should get item by null key', () => {
      instance.setItem('null', 'foo')
      expect(instance.getItem(null)).toBe('foo')
    })

    it('should get item by string key', () => {
      instance.setItem('foo', 'bar')
      expect(instance.getItem('foo')).toBe('bar')
    })

    it('should throw when trying to get item by symbol key', () => {
      expect(() => {
        instance.getItem(Symbol('foo'))
      }).toThrow(TypeError)
    })

    it('should get item by undefined key', () => {
      instance.setItem('undefined', 'foo')
      expect(instance.getItem(undefined)).toBe('foo')
    })
  })

  describe('key()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.key = 'foo'
      }).toThrow(TypeError)
    })

    it('returns key at index', () => {
      instance.setItem('foo', 'bar')
      instance.setItem('baz', 'spam')
      expect(instance.key(0)).toBe('foo')
    })

    it('returns null if no key at index', () => {
      expect(instance.key(0)).toBe(null)
    })
  })

  describe('removeItem()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.removeItem = 'foo'
      }).toThrow(TypeError)
    })

    it('should not throw when item does not exist', () => {
      expect(() => {
        instance.removeItem('foo')
      }).not.toThrow()
      expect(instance).toHaveLength(0)
    })

    it('should remove item', () => {
      instance.setItem('foo', 'bar')
      expect(instance).toHaveLength(1)
      instance.removeItem('foo')
      expect(instance).toHaveLength(0)
    })
  })

  describe('setItem()', () => {
    it('should not be overwritable', () => {
      expect(() => {
        instance.setItem = 'foo'
      }).toThrow(TypeError)
    })

    it('should set item for new key', () => {
      expect(instance.setItem('foo', 'bar')).toBe(undefined)
      expect(instance).toHaveLength(1)
      expect(instance.getItem('foo')).toBe('bar')
    })

    it('should update value for existing key', () => {
      expect(instance.setItem('foo', 'bar')).toBe(undefined)
      expect(instance.setItem('foo', 'baz')).toBe(undefined)
      expect(instance).toHaveLength(1)
      expect(instance.getItem('foo')).toBe('baz')
    })
  })
})
