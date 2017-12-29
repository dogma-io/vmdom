/**
 * @format
 */

import MutationObserver from '../MutationObserver'

describe('MutationObserver', () => {
  it('should throw when non-function argument passed in to constructor', () => {
    expect(() => {
      new MutationObserver('foobar') // eslint-disable-line
    }).toThrow(TypeError)
  })

  describe('when initialized with function argument', () => {
    let callback, instance

    beforeEach(() => {
      callback = jest.fn()
      instance = new MutationObserver(callback)
    })

    it('should have expected enumerables', () => {
      expect(instance).toHaveEnumerables([])
    })

    it('should not allow _callback property to be overwritten', () => {
      expect(() => {
        instance._callback = 'foobar'
      }).toThrow(TypeError)
    })
  })
})
