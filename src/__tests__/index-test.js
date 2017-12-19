import Browser from '../Browser'
import Document from '../Document'
import DOMException from '../DOMException'
import * as exports from '../index.js'
import eventTargetMixin from '../mixins/EventTarget'
import nodeMixin from '../mixins/Node'
import windowOrWorkerGlobalScopeMixin from '../mixins/WindowOrWorkerGlobalScope'
import NodeList from '../NodeList'
import {lazilyLoadProp} from '../utils'
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

    it('exports NodeList', () => {
      expect(exports.NodeList).toBe(NodeList)
    })

    it('exports Window', () => {
      expect(exports.Window).toBe(Window)
    })
  })

  describe('mixins', () => {
    it('exports eventTargetMixin', () => {
      expect(exports.eventTargetMixin).toBe(eventTargetMixin)
    })

    it('exports nodeMixin', () => {
      expect(exports.nodeMixin).toBe(nodeMixin)
    })

    it('exports windowOrWorkerGlobalScopeMixin', () => {
      expect(exports.windowOrWorkerGlobalScopeMixin).toBe(
        windowOrWorkerGlobalScopeMixin,
      )
    })
  })

  describe('utils', () => {
    it('exports lazilyLoadProp', () => {
      expect(exports.lazilyLoadProp).toBe(lazilyLoadProp)
    })
  })
})
