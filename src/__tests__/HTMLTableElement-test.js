import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLTableCaptionElement from '../HTMLTableCaptionElement'
import HTMLTableElement from '../HTMLTableElement'
import HTMLTableRowElement from '../HTMLTableRowElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLTableElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLTableElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'table')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })

  it('should throw DOM exception when setting caption property to non-caption element', () => {
    expect(() => {
      instance.caption = new HTMLTableRowElement()
    }).toThrow(
      /Failed to set the 'caption' property on 'HTMLTableElement': The provided value is not of type 'HTMLTableCaptionElement'\./,
    )
  })

  describe('when contains a caption element', () => {
    let captionElement

    beforeEach(() => {
      captionElement = new HTMLTableCaptionElement()
      instance.appendChild(new HTMLTableRowElement())
      instance.appendChild(captionElement)
      instance.appendChild(new HTMLTableRowElement())
    })

    it('should return caption element for caption property', () => {
      expect(instance.caption).toBe(captionElement)
    })

    it('should replace caption element when set caption property', () => {
      const newCaptionElement = new HTMLTableCaptionElement()
      instance.caption = newCaptionElement
      expect(instance.childNodes).toHaveLength(3)
      expect(instance.childNodes[0]).toBe(newCaptionElement)
      expect(instance.childNodes[1]).toBeInstanceOf(HTMLTableRowElement)
      expect(instance.childNodes[2]).toBeInstanceOf(HTMLTableRowElement)
    })
  })

  describe('when does not contain a caption element', () => {
    describe('when does not contain a row element', () => {
      it('should return null for caption property', () => {
        expect(instance.caption).toBe(null)
      })

      it('should add caption element when setting caption property', () => {
        const newCaptionElement = new HTMLTableCaptionElement()
        instance.caption = newCaptionElement
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newCaptionElement)
      })
    })

    describe('when contains a row element', () => {
      beforeEach(() => {
        instance.appendChild(new HTMLTableRowElement())
      })

      it('should return null for caption property', () => {
        expect(instance.caption).toBe(null)
      })

      it('should add caption element when setting caption property', () => {
        const newCaptionElement = new HTMLTableCaptionElement()
        instance.caption = newCaptionElement
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(newCaptionElement)
        expect(instance.childNodes[1]).toBeInstanceOf(HTMLTableRowElement)
      })
    })
  })
})
