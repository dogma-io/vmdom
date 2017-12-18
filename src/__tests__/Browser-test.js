import Browser from '../Browser'
import Window from '../Window'

describe('Browser', () => {
  let instance

  beforeEach(() => {
    instance = new Browser()
  })

  it('should instantiate sandbox and have expected enumerables', () => {
    expect(instance._sandbox).toEqual({window: instance.window})
    expect(instance.window).toBeInstanceOf(Window)
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _sandbox property to be overwritten', () => {
    expect(() => {
      instance._sandbox = 'foobar'
    }).toThrowError(TypeError)
  })

  it('should not allow window property to be overwritten', () => {
    expect(() => {
      instance.window = 'foobar'
    }).toThrowError(TypeError)
  })

  describe('eval()', () => {
    it('should execute Javascript against sandbox', () => {
      expect(instance.eval("window.foo = 'bar'")).toBe(undefined)
      expect(instance.window.foo).toBe('bar')
    })
  })
})
