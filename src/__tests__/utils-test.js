import {lazilyLoadInstanceAsProp, lazilyLoadModuleAsProp} from '../utils'

describe('utils', () => {
  describe('lazilyLoadInstanceAsProp()', () => {
    let Baz, init

    beforeEach(() => {
      init = jest.fn()

      Baz = class Baz {
        constructor() {
          init(...arguments)
        }
      }
    })

    describe('when prop should be class instance without initialization arguments', () => {
      let foo

      beforeEach(() => {
        class Foo {
          constructor() {
            lazilyLoadInstanceAsProp(this, 'bar', Baz)
            lazilyLoadInstanceAsProp(this, 'baz', Baz) // tests _isLoaded already exists check
          }
        }

        foo = new Foo()
      })

      it('should not instantiate lazily loaded property on initializtion', () => {
        expect(init).not.toHaveBeenCalled()
      })

      it('should not allow lazily loaded property to be overwritten', () => {
        expect((foo.bar = 'baz')).toBe('baz')
        expect(foo.bar).not.toBe('baz')
      })

      describe('when lazily loaded property accessed', () => {
        let value

        beforeEach(() => {
          value = foo.bar
        })

        it('should instantiate property and return expected value for property', () => {
          expect(value).toBeInstanceOf(Baz)
          expect(init).toHaveBeenCalledTimes(1)
          expect(init).toHaveBeenCalledWith()
        })

        it('should return same instance when accessed a second time', () => {
          expect(foo.bar).toBe(value)
        })
      })
    })

    describe('when prop should be class instance with initialization arguments', () => {
      let args, foo

      beforeEach(() => {
        args = ['alpha', 'bravo']

        class Foo {
          constructor() {
            lazilyLoadInstanceAsProp(this, 'bar', Baz, {args})
          }
        }

        foo = new Foo()
      })

      it('should not instantiate lazily loaded property on initializtion', () => {
        expect(init).not.toHaveBeenCalled()
      })

      it('should not allow lazily loaded property to be overwritten', () => {
        expect((foo.bar = 'baz')).toBe('baz')
        expect(foo.bar).not.toBe('baz')
      })

      describe('when lazily loaded property accessed', () => {
        let value

        beforeEach(() => {
          value = foo.bar
        })

        it('should instantiate property and return expected value for property', () => {
          expect(value).toBeInstanceOf(Baz)
          expect(init).toHaveBeenCalledTimes(1)
          expect(init).toHaveBeenCalledWith(...args)
        })

        it('should return same instance when accessed a second time', () => {
          expect(foo.bar).toBe(value)
        })
      })
    })
  })

  describe('lazilyLoadModuleAsProp()', () => {
    let baz, foo, requireStub

    beforeEach(() => {
      baz = jest.fn()
      requireStub = jest.fn().mockReturnValue(baz) // eslint-disable-line

      class Foo {
        constructor() {
          lazilyLoadModuleAsProp(this, 'bar', './baz', requireStub)
        }
      }

      foo = new Foo()
    })

    it('should not require module before property is accessed', () => {
      expect(requireStub).not.toHaveBeenCalled()
    })

    it('should not allow property to be overwritten', () => {
      expect((foo.bar = 'baz')).toBe('baz')
      expect(foo.bar).not.toBe('baz')
    })

    it('should require module when property is accessed and return as property value', () => {
      expect(foo.bar).toBe(baz)
      expect(requireStub).toHaveBeenCalledTimes(1)
      expect(requireStub).toHaveBeenCalledWith('./baz')
    })
  })
})
