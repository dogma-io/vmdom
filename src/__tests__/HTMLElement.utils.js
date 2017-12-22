/**
 * @format
 */

import {itShouldBeAnElement} from './Element.utils'

export function itShouldBeAnHTMLElement(getInstance, tagName) {
  itShouldBeAnElement(getInstance, tagName)

  describe('HTMLElement interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
    })

    it('should implement expected interfaces', () => {
      expect(instance).toImplementGlobalEventHandlers()
    })

    describe('blur()', () => {
      it('should not throw when onblur event handler is not present', () => {
        expect(() => {
          instance.blur()
        }).not.toThrow()
      })

      it('should trigger onblur event handler when it is defined', () => {
        instance.onblur = jest.fn()
        instance.blur()
        expect(instance.onblur).toHaveBeenCalledTimes(1)
      })
    })

    describe('click()', () => {
      it('should not throw when onclick event handler is not present', () => {
        expect(() => {
          instance.click()
        }).not.toThrow()
      })

      it('should trigger onclick event handler when it is defined', () => {
        instance.onclick = jest.fn()
        instance.click()
        expect(instance.onclick).toHaveBeenCalledTimes(1)
      })
    })

    describe('focus()', () => {
      it('should not throw when onfocus event handler is not present', () => {
        expect(() => {
          instance.focus()
        }).not.toThrow()
      })

      it('should trigger onfocus event handler when it is defined', () => {
        instance.onfocus = jest.fn()
        instance.focus()
        expect(instance.onfocus).toHaveBeenCalledTimes(1)
      })
    })
  })
}
