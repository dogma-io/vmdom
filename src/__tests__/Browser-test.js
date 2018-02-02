jest.mock('../Window')

import Browser from '../Browser'
import Window from '../Window'
import {readFileSync} from 'fs'
import {join} from 'path'
import {Script} from 'vm'

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

function getDefaultBrowser() {
  const {version} = JSON.parse(
    readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf8'),
  )

  return `vmdom/${version}`
}

describe('Browser', () => {
  let instance

  beforeEach(() => {
    Window.mockReset()
  })

  describe('when no options set', () => {
    beforeEach(() => {
      instance = new Browser()
    })

    it('should instantiate sandbox and have expected enumerables', () => {
      expect(instance._sandbox).toBeInstanceOf(Browser)
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: true,
        includeBody: true,
        userAgent: getDefaultBrowser(),
      })
      expect(instance.window).toBeInstanceOf(Window)
      expect(instance).toHaveEnumerables([])
    })

    it('should not allow _sandbox property to be overwritten', () => {
      expect(() => {
        instance._sandbox = 'foobar'
      }).toThrow(TypeError)
    })

    it('should not allow global property to be overwritten', () => {
      expect(() => {
        instance.global = 'foobar'
      }).toThrow(TypeError)
    })

    it('should not allow window property to be overwritten', () => {
      expect(() => {
        instance.window = 'foobar'
      }).toThrow(TypeError)
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
      it('should include filename in stacktraces when filename passed in', () => {
        try {
          instance.eval('throw new Error()', 'foobar.js')
        } catch (err) {
          expect(err.stack).toEqual(expect.stringContaining('foobar.js'))
          return
        }

        throw new Error('Expected an error to be thrown')
      })

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
        expect(instance.eval("global = 'foo'")).toBe('foo')
        expect(instance.global).not.toBe('foo')
      })

      it('should not allow reassignment of window', () => {
        expect(instance.eval("window = 'foo'")).toBe('foo')
        expect(instance.window).not.toBe('foo')
      })

      it('should allow access of window properties via global reference', () => {
        instance.window.foo = 'bar'
        expect(instance.eval('foo')).toBe('bar')
      })
    })
  })

  describe('when includeBody option set to true', () => {
    beforeEach(() => {
      instance = new Browser({includeBody: true})
    })

    it('should instantiate window with expected options', () => {
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: true,
        includeBody: true,
        userAgent: getDefaultBrowser(),
      })
    })
  })

  describe('when includeBody option set to false', () => {
    beforeEach(() => {
      instance = new Browser({includeBody: false})
    })

    it('should instantiate window with expected options', () => {
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: true,
        includeBody: false,
        userAgent: getDefaultBrowser(),
      })
    })
  })

  describe('when includeHead option set to true', () => {
    beforeEach(() => {
      instance = new Browser({includeHead: true})
    })

    it('should instantiate window with expected options', () => {
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: true,
        includeBody: true,
        userAgent: getDefaultBrowser(),
      })
    })
  })

  describe('when includeHead option set to false', () => {
    beforeEach(() => {
      instance = new Browser({includeHead: false})
    })

    it('should instantiate window with expected options', () => {
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: false,
        includeBody: true,
        userAgent: getDefaultBrowser(),
      })
    })
  })

  describe('when userAgent option set', () => {
    beforeEach(() => {
      instance = new Browser({userAgent: UA})
    })

    it('should instantiate window with expected options', () => {
      expect(Window).toHaveBeenCalledTimes(1)
      expect(Window).toHaveBeenCalledWith({
        includeHead: true,
        includeBody: true,
        userAgent: UA,
      })
    })
  })
})
