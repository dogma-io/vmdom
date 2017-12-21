import Storage from '../Storage'

describe('Storage', () => {
  let instance

  beforeEach(() => {
    instance = new Storage()
  })

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _items property to be overwritten', () => {
    expect(() => {
      instance._items = 'foo'
    }).toThrowError(TypeError)
  })

  it('should not allow length property to be overwritten', () => {
    expect((instance.length = 20)).toBe(20)
    expect(instance.length).toBe(0)
  })

  describe('clear()', () => {
    it('should not throw when nothing to clear', () => {
      expect(() => {
        instance.clear()
      }).not.toThrow()
      expect(instance).toHaveLength(0)
    })

    it('should remove all items', () => {
      instance._items.foo = 'bar'
      instance._items.baz = 'spam'
      instance.clear()
      expect(instance).toHaveLength(0)
    })
  })

  describe('getItem()', () => {
    it('should get item by numeric key', () => {
      instance._items['1'] = 'foo'
      expect(instance.getItem(1)).toBe('foo')
    })

    it('should get item by null key', () => {
      instance._items['null'] = 'foo'
      expect(instance.getItem(null)).toBe('foo')
    })

    it('should get item by string key', () => {
      instance._items.foo = 'bar'
      expect(instance.getItem('foo')).toBe('bar')
    })

    it('should throw when trying to get item by symbol key', () => {
      expect(() => {
        instance.getItem(Symbol('foo'))
      }).toThrowError(TypeError)
    })

    it('should get item by undefined key', () => {
      instance._items['undefined'] = 'foo'
      expect(instance.getItem(undefined)).toBe('foo')
    })
  })

  describe('key()', () => {
    it('returns key at index', () => {
      instance._items.foo = 'bar'
      instance._items.baz = 'spam'
      expect(instance.key(0)).toBe('foo')
    })

    it('returns null if no key at index', () => {
      expect(instance.key(0)).toBe(null)
    })
  })

  describe('removeItem()', () => {
    it('should not throw when item does not exist', () => {
      expect(() => {
        instance.removeItem('foo')
      }).not.toThrow()
      expect(instance).toHaveLength(0)
    })

    it('should remove item', () => {
      instance._items.foo = 'bar'
      instance.removeItem('foo')
      expect(instance).toHaveLength(0)
    })
  })

  describe('setItem()', () => {
    it('should set item for new key', () => {
      expect(instance.setItem('foo', 'bar')).toBe(undefined)
      expect(instance).toHaveLength(1)
      expect(instance._items).toEqual({foo: 'bar'})
    })

    it('should update value for existing key', () => {
      instance._items.foo = 'bar'
      expect(instance.setItem('foo', 'baz')).toBe(undefined)
      expect(instance).toHaveLength(1)
      expect(instance._items).toEqual({foo: 'baz'})
    })
  })
})
