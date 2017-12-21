import Browser from '../Browser'
import Document from '../Document'
import DOMException from '../DOMException'
import Element from '../Element'
import HTMLBodyElement from '../HTMLBodyElement'
import HTMLElement from '../HTMLElement'
import HTMLHeadElement from '../HTMLHeadElement'
import HTMLHtmlElement from '../HTMLHtmlElement'
import * as exports from '../index.js'
import MediaQueryList from '../MediaQueryList'
import eventTargetMixin from '../mixins/EventTarget'
import globalEventHandlersMixin from '../mixins/GlobalEventHandlers'
import nodeMixin from '../mixins/Node'
import touchEventHandlersMixin from '../mixins/TouchEventHandlers'
import windowOrWorkerGlobalScopeMixin from '../mixins/WindowOrWorkerGlobalScope'
import Navigator from '../Navigator'
import NodeList from '../NodeList'
import Storage from '../Storage'
import {
  defineEventHandlers,
  lazilyLoadInstanceAsProp,
  lazilyLoadModuleAsProp,
} from '../utils'
import Window from '../Window'

describe('vmdom', () => {
  describe('classes', () => {
    it('exports Browser', () => {
      expect(exports.Browser).toBe(Browser)
    })

    it('exports Document', () => {
      expect(exports.Document).toBe(Document)
    })

    it('exports DOMException', () => {
      expect(exports.DOMException).toBe(DOMException)
    })

    it('exports Element', () => {
      expect(exports.Element).toBe(Element)
    })

    it('exports HTMLBodyElement', () => {
      expect(exports.HTMLBodyElement).toBe(HTMLBodyElement)
    })

    it('exports HTMLElement', () => {
      expect(exports.HTMLElement).toBe(HTMLElement)
    })

    it('exports HTMLHeadElement', () => {
      expect(exports.HTMLHeadElement).toBe(HTMLHeadElement)
    })

    it('exports HTMLHtmlElement', () => {
      expect(exports.HTMLHtmlElement).toBe(HTMLHtmlElement)
    })

    it('exports MediaQueryList', () => {
      expect(exports.MediaQueryList).toBe(MediaQueryList)
    })

    it('exports Navigator', () => {
      expect(exports.Navigator).toBe(Navigator)
    })

    it('exports NodeList', () => {
      expect(exports.NodeList).toBe(NodeList)
    })

    it('exports Storage', () => {
      expect(exports.Storage).toBe(Storage)
    })

    it('exports Window', () => {
      expect(exports.Window).toBe(Window)
    })
  })

  describe('mixins', () => {
    it('exports eventTargetMixin', () => {
      expect(exports.eventTargetMixin).toBe(eventTargetMixin)
    })

    it('exports globalEventHandlersMixin', () => {
      expect(exports.globalEventHandlersMixin).toBe(globalEventHandlersMixin)
    })

    it('exports nodeMixin', () => {
      expect(exports.nodeMixin).toBe(nodeMixin)
    })

    it('exports touchEventHandlersMixin', () => {
      expect(exports.touchEventHandlersMixin).toBe(touchEventHandlersMixin)
    })

    it('exports windowOrWorkerGlobalScopeMixin', () => {
      expect(exports.windowOrWorkerGlobalScopeMixin).toBe(
        windowOrWorkerGlobalScopeMixin,
      )
    })
  })

  describe('utils', () => {
    it('exports defineEventHandlers', () => {
      expect(exports.defineEventHandlers).toBe(defineEventHandlers)
    })

    it('exports lazilyLoadInstanceAsProp', () => {
      expect(exports.lazilyLoadInstanceAsProp).toBe(lazilyLoadInstanceAsProp)
    })

    it('exports lazilyLoadModuleAsProp', () => {
      expect(exports.lazilyLoadModuleAsProp).toBe(lazilyLoadModuleAsProp)
    })
  })
})
