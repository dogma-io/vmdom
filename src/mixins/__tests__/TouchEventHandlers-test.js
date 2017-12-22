/**
 * @format
 */

import touchEventHandlersMixin from '../TouchEventHandlers'

const PROPERTIES = [
  'ontouchstart',
  'ontouchend',
  'ontouchmove',
  'ontouchenter',
  'ontouchleave',
  'ontouchcancel',
]

class Superclass {}
const TouchEventHandlersClass = touchEventHandlersMixin(Superclass)

describe('TouchEventHandlers', () => {
  let instance

  beforeEach(() => {
    instance = new TouchEventHandlersClass()
  })

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(PROPERTIES)
  })

  PROPERTIES.forEach(property => {
    it(`should return undefined for property ${property}`, () => {
      expect(instance[property]).toBe(null)
    })

    it(`should not allow setting property ${property} to a boolean`, () => {
      expect((instance[property] = true)).toBe(true)
      expect(instance[property]).toBe(null)
    })

    it(`should allow setting property ${property} to a function`, () => {
      const fn = () => {}
      expect((instance[property] = fn)).toBe(fn)
      expect(instance[property]).toBe(fn)
    })

    it(`should not allow setting property ${property} to a number`, () => {
      expect((instance[property] = 1)).toBe(1)
      expect(instance[property]).toBe(null)
    })

    it(`should not allow setting property ${property} to a string`, () => {
      expect((instance[property] = 'foo')).toBe('foo')
      expect(instance[property]).toBe(null)
    })

    it(`should not allow setting property ${property} to a symbol`, () => {
      const symbol = Symbol('foo')
      expect((instance[property] = symbol)).toBe(symbol)
      expect(instance[property]).toBe(null)
    })

    describe(`when property ${property} is a function`, () => {
      beforeEach(() => {
        instance[property] = () => {}
      })

      it('should allow setting it to null', () => {
        expect((instance[property] = null)).toBe(null)
        expect(instance[property]).toBe(null)
      })
    })
  })
})
