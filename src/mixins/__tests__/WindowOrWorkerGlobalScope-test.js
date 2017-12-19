jest.mock('node-fetch')

import windowOrWorkerGlobalScopeMixin from '../WindowOrWorkerGlobalScope'
import fetch from 'node-fetch'

class Superclass {}

const WindowOrWorkerGlobalScopeClass = windowOrWorkerGlobalScopeMixin(
  Superclass,
)

const BTOA_TESTS = [
  ['', ''],
  ['f', 'Zg=='],
  ['fo', 'Zm8='],
  ['foo', 'Zm9v'],
  ['foob', 'Zm9vYg=='],
  ['fooba', 'Zm9vYmE='],
  ['foobar', 'Zm9vYmFy'],
  [undefined, 'dW5kZWZpbmVk'],
  [null, 'bnVsbA=='],
  [false, 'ZmFsc2U='],
  [true, 'dHJ1ZQ=='],
  [0, 'MA=='],
  [-0, 'MA=='],
  [Infinity, 'SW5maW5pdHk='],
  [-Infinity, 'LUluZmluaXR5'],
  [NaN, 'TmFO'],
]

describe('WindowOrWorkerGlobalScope', () => {
  let instance

  beforeEach(() => {
    instance = new WindowOrWorkerGlobalScopeClass()
  })

  it('should have expected emuerables and sets for interval/timeout ids', () => {
    expect(instance._intervalIds).toBeInstanceOf(Set)
    expect(instance._intervalIds.size).toBe(0)
    expect(instance._timeoutIds).toBeInstanceOf(Set)
    expect(instance._timeoutIds.size).toBe(0)
    expect(instance).toHaveEnumerables([])
  })

  describe('atob()', () => {
    BTOA_TESTS.forEach(([output, input]) => {
      it(`should return ${output} when input is ${input}`, () => {
        expect(instance.atob(input)).toBe(`${output}`)
      })
    })
  })

  describe('btoa()', () => {
    BTOA_TESTS.forEach(([input, output]) => {
      it(`should return ${output} when input is ${input}`, () => {
        expect(instance.btoa(input)).toBe(output)
      })
    })

    it('throws an error when input is non-latin1 string', () => {
      expect(() => {
        instance.btoa('עברית')
      }).toThrowError(
        "DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.",
      )
    })

    it('throws an error when input is a symbol', () => {
      expect(() => {
        instance.btoa(Symbol('foobar'))
      }).toThrowError(TypeError)
    })
  })

  describe('clearInterval()', () => {
    let originalFn

    beforeEach(() => {
      originalFn = global.clearInterval
      global.clearInterval = jest.fn().mockReturnValue(undefined)
    })

    afterEach(() => {
      global.clearInterval = originalFn
    })

    it("should wrape Node's clearInterval() and stop tracking interval id", () => {
      instance._intervalIds.add(3)
      expect(instance.clearInterval(3)).toBe(undefined)
      expect(global.clearInterval).toHaveBeenCalledTimes(1)
      expect(global.clearInterval).toHaveBeenCalledWith(3)
      expect(instance._intervalIds.has(3)).toBe(false)
    })
  })

  describe('clearTimeout()', () => {
    let originalFn

    beforeEach(() => {
      originalFn = global.clearTimeout
      global.clearTimeout = jest.fn().mockReturnValue(undefined)
    })

    afterEach(() => {
      global.clearTimeout = originalFn
    })

    it("should wrape Node's clearTimeout() and stop tracking timeout id", () => {
      instance._timeoutIds.add(3)
      expect(instance.clearTimeout(3)).toBe(undefined)
      expect(global.clearTimeout).toHaveBeenCalledTimes(1)
      expect(global.clearTimeout).toHaveBeenCalledWith(3)
      expect(instance._timeoutIds.has(3)).toBe(false)
    })
  })

  it('destroy() clears pending intervals and timouts', () => {
    instance._intervalIds.add(1)
    instance._intervalIds.add(2)
    instance._timeoutIds.add(3)
    instance._timeoutIds.add(4)

    WindowOrWorkerGlobalScopeClass.destroy(instance)

    expect(instance._intervalIds.size).toBe(0)
    expect(instance._timeoutIds.size).toBe(0)
  })

  describe('fetch()', () => {
    let result

    beforeEach(() => {
      result = Promise.resolve('foobar')
      fetch.mockReturnValue(result)
    })

    it("should call node-fetch's fetch method and returns result", () => {
      const url = 'http://www.example.com'
      expect(instance.fetch(url)).toBe(result)
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(url)
    })
  })

  describe('setInterval()', () => {
    let originalFn

    beforeEach(() => {
      originalFn = global.setInterval
      global.setInterval = jest.fn().mockReturnValue(23)
    })

    afterEach(() => {
      global.setInterval = originalFn
    })

    it("should wrape Node's setInterval() and track interval id", () => {
      const callback = () => {}
      expect(instance.setInterval(callback, 1000)).toBe(23)
      expect(global.setInterval).toHaveBeenCalledTimes(1)
      expect(global.setInterval).toHaveBeenCalledWith(callback, 1000)
      expect(instance._intervalIds.has(23)).toBe(true)
    })
  })

  describe('setTimeout()', () => {
    let originalFn

    beforeEach(() => {
      originalFn = global.setTimeout
      global.setTimeout = jest.fn().mockReturnValue(23)
    })

    afterEach(() => {
      global.setTimeout = originalFn
    })

    it("should wrape Node's setTimeout() and track timeout id", () => {
      const callback = () => {}
      expect(instance.setTimeout(callback, 1000)).toBe(23)
      expect(global.setTimeout).toHaveBeenCalledTimes(1)
      expect(global.setTimeout).toHaveBeenCalledWith(callback, 1000)
      expect(instance._timeoutIds.has(23)).toBe(true)
    })
  })
})
