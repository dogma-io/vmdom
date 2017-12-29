import Browser from '../Browser'
import CharacterData from '../CharacterData'
import Comment from '../Comment'
import Document from '../Document'
import DocumentFragment from '../DocumentFragment'
import DOMException from '../DOMException'
import Element from '../Element'
import HTMLAnchorElement from '../HTMLAnchorElement'
import HTMLAreaElement from '../HTMLAreaElement'
import HTMLAudioElement from '../HTMLAudioElement'
import HTMLBaseElement from '../HTMLBaseElement'
import HTMLBodyElement from '../HTMLBodyElement'
import HTMLBRElement from '../HTMLBRElement'
import HTMLButtonElement from '../HTMLButtonElement'
import HTMLCanvasElement from '../HTMLCanvasElement'
import HTMLDataElement from '../HTMLDataElement'
import HTMLDataListElement from '../HTMLDataListElement'
import HTMLDetailsElement from '../HTMLDetailsElement'
import HTMLDialogElement from '../HTMLDialogElement'
import HTMLDivElement from '../HTMLDivElement'
import HTMLDListElement from '../HTMLDListElement'
import HTMLElement from '../HTMLElement'
import HTMLEmbedElement from '../HTMLEmbedElement'
import HTMLFieldSetElement from '../HTMLFieldSetElement'
import HTMLFontElement from '../HTMLFontElement'
import HTMLFormElement from '../HTMLFormElement'
import HTMLFrameSetElement from '../HTMLFrameSetElement'
import HTMLHeadElement from '../HTMLHeadElement'
import HTMLHeadingElement from '../HTMLHeadingElement'
import HTMLHRElement from '../HTMLHRElement'
import HTMLHtmlElement from '../HTMLHtmlElement'
import HTMLIFrameElement from '../HTMLIFrameElement'
import HTMLImageElement from '../HTMLImageElement'
import HTMLInputElement from '../HTMLInputElement'
import HTMLKeygenElement from '../HTMLKeygenElement'
import HTMLLabelElement from '../HTMLLabelElement'
import HTMLLegendElement from '../HTMLLegendElement'
import HTMLLIElement from '../HTMLLIElement'
import HTMLLinkElement from '../HTMLLinkElement'
import HTMLMapElement from '../HTMLMapElement'
import HTMLMediaElement from '../HTMLMediaElement'
import HTMLMeterElement from '../HTMLMeterElement'
import HTMLModElement from '../HTMLModElement'
import HTMLObjectElement from '../HTMLObjectElement'
import HTMLOListElement from '../HTMLOListElement'
import HTMLOptGroupElement from '../HTMLOptGroupElement'
import HTMLOptionElement from '../HTMLOptionElement'
import HTMLOutputElement from '../HTMLOutputElement'
import HTMLParagraphElement from '../HTMLParagraphElement'
import HTMLParamElement from '../HTMLParamElement'
import HTMLPictureElement from '../HTMLPictureElement'
import HTMLPreElement from '../HTMLPreElement'
import HTMLProgressElement from '../HTMLProgressElement'
import HTMLQuoteElement from '../HTMLQuoteElement'
import HTMLScriptElement from '../HTMLScriptElement'
import HTMLSelectElement from '../HTMLSelectElement'
import HTMLSlotElement from '../HTMLSlotElement'
import HTMLSourceElement from '../HTMLSourceElement'
import HTMLSpanElement from '../HTMLSpanElement'
import HTMLStyleElement from '../HTMLStyleElement'
import HTMLTableCaptionElement from '../HTMLTableCaptionElement'
import HTMLTableCellElement from '../HTMLTableCellElement'
import HTMLTableColElement from '../HTMLTableColElement'
import HTMLTableDataCellElement from '../HTMLTableDataCellElement'
import HTMLTableElement from '../HTMLTableElement'
import HTMLTableHeaderCellElement from '../HTMLTableHeaderCellElement'
import HTMLTableRowElement from '../HTMLTableRowElement'
import HTMLTableSectionElement from '../HTMLTableSectionElement'
import HTMLTemplateElement from '../HTMLTemplateElement'
import HTMLTextAreaElement from '../HTMLTextAreaElement'
import HTMLTimeElement from '../HTMLTimeElement'
import HTMLTitleElement from '../HTMLTitleElement'
import HTMLTrackElement from '../HTMLTrackElement'
import HTMLUListElement from '../HTMLUListElement'
import HTMLUnknownElement from '../HTMLUnknownElement'
import HTMLVideoElement from '../HTMLVideoElement'
import * as exports from '../index.js'
import MediaQueryList from '../MediaQueryList'
import eventTargetMixin from '../mixins/EventTarget'
import globalEventHandlersMixin from '../mixins/GlobalEventHandlers'
import touchEventHandlersMixin from '../mixins/TouchEventHandlers'
import windowOrWorkerGlobalScopeMixin from '../mixins/WindowOrWorkerGlobalScope'
import MutationObserver from '../MutationObserver'
import MutationRecord from '../MutationRecord'
import Navigator from '../Navigator'
import Node from '../Node'
import NodeList from '../NodeList'
import Storage from '../Storage'
import Text from '../Text'
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

    it('exports CharacterData', () => {
      expect(exports.CharacterData).toBe(CharacterData)
    })

    it('exports Comment', () => {
      expect(exports.Comment).toBe(Comment)
    })

    it('exports Document', () => {
      expect(exports.Document).toBe(Document)
    })

    it('exports DocumentFragment', () => {
      expect(exports.DocumentFragment).toBe(DocumentFragment)
    })

    it('exports DOMException', () => {
      expect(exports.DOMException).toBe(DOMException)
    })

    it('exports Element', () => {
      expect(exports.Element).toBe(Element)
    })

    it('exports HTMLAnchorElement', () => {
      expect(exports.HTMLAnchorElement).toBe(HTMLAnchorElement)
    })

    it('exports HTMLAreaElement', () => {
      expect(exports.HTMLAreaElement).toBe(HTMLAreaElement)
    })

    it('exports HTMLAudioElement', () => {
      expect(exports.HTMLAudioElement).toBe(HTMLAudioElement)
    })

    it('exports HTMLBaseElement', () => {
      expect(exports.HTMLBaseElement).toBe(HTMLBaseElement)
    })

    it('exports HTMLBodyElement', () => {
      expect(exports.HTMLBodyElement).toBe(HTMLBodyElement)
    })

    it('exports HTMLBRElement', () => {
      expect(exports.HTMLBRElement).toBe(HTMLBRElement)
    })

    it('exports HTMLButtonElement', () => {
      expect(exports.HTMLButtonElement).toBe(HTMLButtonElement)
    })

    it('exports HTMLCanvasElement', () => {
      expect(exports.HTMLCanvasElement).toBe(HTMLCanvasElement)
    })

    it('exports HTMLDataElement', () => {
      expect(exports.HTMLDataElement).toBe(HTMLDataElement)
    })

    it('exports HTMLDataListElement', () => {
      expect(exports.HTMLDataListElement).toBe(HTMLDataListElement)
    })

    it('exports HTMLDetailsElement', () => {
      expect(exports.HTMLDetailsElement).toBe(HTMLDetailsElement)
    })

    it('exports HTMLDialogElement', () => {
      expect(exports.HTMLDialogElement).toBe(HTMLDialogElement)
    })

    it('exports HTMLDivElement', () => {
      expect(exports.HTMLDivElement).toBe(HTMLDivElement)
    })

    it('exports HTMLDListElement', () => {
      expect(exports.HTMLDListElement).toBe(HTMLDListElement)
    })

    it('exports HTMLElement', () => {
      expect(exports.HTMLElement).toBe(HTMLElement)
    })

    it('exports HTMLEmbedElement', () => {
      expect(exports.HTMLEmbedElement).toBe(HTMLEmbedElement)
    })

    it('exports HTMLFieldSetElement', () => {
      expect(exports.HTMLFieldSetElement).toBe(HTMLFieldSetElement)
    })

    it('exports HTMLFontElement', () => {
      expect(exports.HTMLFontElement).toBe(HTMLFontElement)
    })

    it('exports HTMLFormElement', () => {
      expect(exports.HTMLFormElement).toBe(HTMLFormElement)
    })

    it('exports HTMLFrameSetElement', () => {
      expect(exports.HTMLFrameSetElement).toBe(HTMLFrameSetElement)
    })

    it('exports HTMLHeadElement', () => {
      expect(exports.HTMLHeadElement).toBe(HTMLHeadElement)
    })

    it('exports HTMLHeadingElement', () => {
      expect(exports.HTMLHeadingElement).toBe(HTMLHeadingElement)
    })

    it('exports HTMLHRElement', () => {
      expect(exports.HTMLHRElement).toBe(HTMLHRElement)
    })

    it('exports HTMLHtmlElement', () => {
      expect(exports.HTMLHtmlElement).toBe(HTMLHtmlElement)
    })

    it('exports HTMLIFrameElement', () => {
      expect(exports.HTMLIFrameElement).toBe(HTMLIFrameElement)
    })

    it('exports HTMLImageElement', () => {
      expect(exports.HTMLImageElement).toBe(HTMLImageElement)
    })

    it('exports HTMLInputElement', () => {
      expect(exports.HTMLInputElement).toBe(HTMLInputElement)
    })

    it('exports HTMLKeygenElement', () => {
      expect(exports.HTMLKeygenElement).toBe(HTMLKeygenElement)
    })

    it('exports HTMLLabelElement', () => {
      expect(exports.HTMLLabelElement).toBe(HTMLLabelElement)
    })

    it('exports HTMLLegendElement', () => {
      expect(exports.HTMLLegendElement).toBe(HTMLLegendElement)
    })

    it('exports HTMLLIElement', () => {
      expect(exports.HTMLLIElement).toBe(HTMLLIElement)
    })

    it('exports HTMLLinkElement', () => {
      expect(exports.HTMLLinkElement).toBe(HTMLLinkElement)
    })

    it('exports HTMLMapElement', () => {
      expect(exports.HTMLMapElement).toBe(HTMLMapElement)
    })

    it('exports HTMLMediaElement', () => {
      expect(exports.HTMLMediaElement).toBe(HTMLMediaElement)
    })

    it('exports HTMLMeterElement', () => {
      expect(exports.HTMLMeterElement).toBe(HTMLMeterElement)
    })

    it('exports HTMLModElement', () => {
      expect(exports.HTMLModElement).toBe(HTMLModElement)
    })

    it('exports HTMLObjectElement', () => {
      expect(exports.HTMLObjectElement).toBe(HTMLObjectElement)
    })

    it('exports HTMLOListElement', () => {
      expect(exports.HTMLOListElement).toBe(HTMLOListElement)
    })

    it('exports HTMLOptGroupElement', () => {
      expect(exports.HTMLOptGroupElement).toBe(HTMLOptGroupElement)
    })

    it('exports HTMLOptionElement', () => {
      expect(exports.HTMLOptionElement).toBe(HTMLOptionElement)
    })

    it('exports HTMLOutputElement', () => {
      expect(exports.HTMLOutputElement).toBe(HTMLOutputElement)
    })

    it('exports HTMLParagraphElement', () => {
      expect(exports.HTMLParagraphElement).toBe(HTMLParagraphElement)
    })

    it('exports HTMLParamElement', () => {
      expect(exports.HTMLParamElement).toBe(HTMLParamElement)
    })

    it('exports HTMLPictureElement', () => {
      expect(exports.HTMLPictureElement).toBe(HTMLPictureElement)
    })

    it('exports HTMLPreElement', () => {
      expect(exports.HTMLPreElement).toBe(HTMLPreElement)
    })

    it('exports HTMLProgressElement', () => {
      expect(exports.HTMLProgressElement).toBe(HTMLProgressElement)
    })

    it('exports HTMLQuoteElement', () => {
      expect(exports.HTMLQuoteElement).toBe(HTMLQuoteElement)
    })

    it('exports HTMLScriptElement', () => {
      expect(exports.HTMLScriptElement).toBe(HTMLScriptElement)
    })

    it('exports HTMLSelectElement', () => {
      expect(exports.HTMLSelectElement).toBe(HTMLSelectElement)
    })

    it('exports HTMLSlotElement', () => {
      expect(exports.HTMLSlotElement).toBe(HTMLSlotElement)
    })

    it('exports HTMLSourceElement', () => {
      expect(exports.HTMLSourceElement).toBe(HTMLSourceElement)
    })

    it('exports HTMLSpanElement', () => {
      expect(exports.HTMLSpanElement).toBe(HTMLSpanElement)
    })

    it('exports HTMLStyleElement', () => {
      expect(exports.HTMLStyleElement).toBe(HTMLStyleElement)
    })

    it('exports HTMLTableCaptionElement', () => {
      expect(exports.HTMLTableCaptionElement).toBe(HTMLTableCaptionElement)
    })

    it('exports HTMLTableCellElement', () => {
      expect(exports.HTMLTableCellElement).toBe(HTMLTableCellElement)
    })

    it('exports HTMLTableColElement', () => {
      expect(exports.HTMLTableColElement).toBe(HTMLTableColElement)
    })

    it('exports HTMLTableDataCellElement', () => {
      expect(exports.HTMLTableDataCellElement).toBe(HTMLTableDataCellElement)
    })

    it('exports HTMLTableElement', () => {
      expect(exports.HTMLTableElement).toBe(HTMLTableElement)
    })

    it('exports HTMLTableHeaderCellElement', () => {
      expect(exports.HTMLTableHeaderCellElement).toBe(
        HTMLTableHeaderCellElement,
      )
    })

    it('exports HTMLTableRowElement', () => {
      expect(exports.HTMLTableRowElement).toBe(HTMLTableRowElement)
    })

    it('exports HTMLTableSectionElement', () => {
      expect(exports.HTMLTableSectionElement).toBe(HTMLTableSectionElement)
    })

    it('exports HTMLTemplateElement', () => {
      expect(exports.HTMLTemplateElement).toBe(HTMLTemplateElement)
    })

    it('exports HTMLTextAreaElement', () => {
      expect(exports.HTMLTextAreaElement).toBe(HTMLTextAreaElement)
    })

    it('exports HTMLTimeElement', () => {
      expect(exports.HTMLTimeElement).toBe(HTMLTimeElement)
    })

    it('exports HTMLTitleElement', () => {
      expect(exports.HTMLTitleElement).toBe(HTMLTitleElement)
    })

    it('exports HTMLTrackElement', () => {
      expect(exports.HTMLTrackElement).toBe(HTMLTrackElement)
    })

    it('exports HTMLUListElement', () => {
      expect(exports.HTMLUListElement).toBe(HTMLUListElement)
    })

    it('exports HTMLUnknownElement', () => {
      expect(exports.HTMLUnknownElement).toBe(HTMLUnknownElement)
    })

    it('exports HTMLVideoElement', () => {
      expect(exports.HTMLVideoElement).toBe(HTMLVideoElement)
    })

    it('exports MediaQueryList', () => {
      expect(exports.MediaQueryList).toBe(MediaQueryList)
    })

    it('exports MutationObserver', () => {
      expect(exports.MutationObserver).toBe(MutationObserver)
    })

    it('exports MutationRecord', () => {
      expect(exports.MutationRecord).toBe(MutationRecord)
    })

    it('exports Navigator', () => {
      expect(exports.Navigator).toBe(Navigator)
    })

    it('exports NodeList', () => {
      expect(exports.NodeList).toBe(NodeList)
    })

    it('exports Node', () => {
      expect(exports.Node).toBe(Node)
    })

    it('exports Storage', () => {
      expect(exports.Storage).toBe(Storage)
    })

    it('exports Text', () => {
      expect(exports.Text).toBe(Text)
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
