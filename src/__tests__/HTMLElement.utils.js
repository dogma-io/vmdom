/**
 * @format
 */

import {itShouldImplementGlobalEventHandlersInterface} from '../mixins/__tests__/GlobalEventHandlers.utils'
import {itShouldImplementTouchEventHandlersInterface} from '../mixins/__tests__/TouchEventHandlers.utils'
import {itShouldBeAnElement} from './Element.utils'

export function itShouldBeAnHTMLElement(getInstance, tagName) {
  itShouldBeAnElement(getInstance, tagName)
  itShouldImplementGlobalEventHandlersInterface(getInstance)
  itShouldImplementTouchEventHandlersInterface(getInstance)

  describe('HTMLElement interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
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
