import Browser from '../Browser'
import Window from '../Window'
import {Script} from 'vm'

describe('Browser', () => {
  let instance

  beforeEach(() => {
    instance = new Browser()
  })

  it('should instantiate sandbox and have expected enumerables', () => {
    expect(instance._sandbox).toBeInstanceOf(Browser)
    expect(instance.window).toBeInstanceOf(Window)
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _sandbox property to be overwritten', () => {
    expect(() => {
      instance._sandbox = 'foobar'
    }).toThrowError(TypeError)
  })

  it('should not allow global property to be overwritten', () => {
    expect(() => {
      instance.global = 'foobar'
    }).toThrowError(TypeError)
  })

  it('should not allow window property to be overwritten', () => {
    expect(() => {
      instance.window = 'foobar'
    }).toThrowError(TypeError)
  })

  it('destroy() should destroy window', () => {
    jest.spyOn(Window, 'destroy')
    Browser.destroy(instance)
    expect(Window.destroy).toHaveBeenCalledTimes(1)
    expect(Window.destroy).toHaveBeenCalledWith(instance.window)
  })

  it('should allow accessing window properties on global property', () => {
    expect(instance.global.foo).toBe(undefined)
    instance.window.foo = 'bar'
    expect(instance.global.foo).toBe('bar')
  })

  it('should allow accessing global properties on window property', () => {
    expect(instance.window.foo).toBe(undefined)
    instance.global.foo = 'bar'
    expect(instance.window.foo).toBe('bar')
  })

  describe('eval()', () => {
    it('should execute Javascript string against sandbox and return value', () => {
      expect(instance.eval("window.foo = 'bar'")).toBe('bar')
      expect(instance.window.foo).toBe('bar')
    })

    it('should execute vm Script against sandbox and return value', () => {
      const script = new Script("window.foo = 'bar'")
      expect(instance.eval(script)).toBe('bar')
      expect(instance.window.foo).toBe('bar')
    })

    it('should add globally defined variables to window', () => {
      instance.eval("foo = 'bar'")
      expect(instance.window.foo).toBe('bar')
    })

    it('should not allow reassignment of global', () => {
      expect(() => {
        instance.eval("global = 'foo'")
      }).toThrowError(TypeError)
    })

    it('should not allow reassignment of window', () => {
      expect(() => {
        instance.eval("window = 'foo'")
      }).toThrowError(TypeError)
    })

    it('should allow access of window properties via global reference', () => {
      instance.window.foo = 'bar'
      expect(instance.eval('foo')).toBe('bar')
    })
  })
})
