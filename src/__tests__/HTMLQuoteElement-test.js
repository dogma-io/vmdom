import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLQuoteElement from '../HTMLQuoteElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'

describe('HTMLQuoteElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLQuoteElement({tagName: 'q'})
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementGlobalEventHandlers()
    expect(instance).toImplementNode()
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })

  it('should return correct tagName', () => {
    expect(instance.tagName).toBe('q')
  })

  it('should not allow tagName property to be overwritten', () => {
    expect(() => {
      instance.tagName = 'div'
    }).toThrowError(TypeError)
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
