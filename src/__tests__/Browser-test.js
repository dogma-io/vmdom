import Browser from '../Browser'
import Window from '../Window'

describe('Browser', () => {
  let instance

  beforeEach(() => {
    instance = new Browser()
  })

  it('should instantiate sandbox and have expected enumerables', () => {
    expect(instance._sandbox).toBeInstanceOf(Window)
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _sandbox property to be overwritten', () => {
    expect(() => {
      instance._sandbox = 'foobar'
    }).toThrowError(TypeError)
  })
})
