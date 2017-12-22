jest.mock('../Document')
jest.mock('../MediaQueryList')
jest.mock('../Navigator')
jest.mock('../Storage')

import Document from '../Document'
import MediaQueryList from '../MediaQueryList'
import Navigator from '../Navigator'
import Storage from '../Storage'
import Window from '../Window'
import {itShouldImplementEventTargetInterface} from '../mixins/__tests__/EventTarget.utils'
import {join} from 'path'

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

const MODULE_PROPERTIES = [
  'Document',
  'DOMException',
  'Element',
  'HTMLAnchorElement',
  'HTMLAreaElement',
  'HTMLAudioElement',
  'HTMLBaseElement',
  'HTMLBodyElement',
  'HTMLBRElement',
  'HTMLButtonElement',
  'HTMLCanvasElement',
  'HTMLDataElement',
  'HTMLDataListElement',
  'HTMLDialogElement',
  'HTMLDivElement',
  'HTMLDListElement',
  'HTMLElement',
  'HTMLEmbedElement',
  'HTMLFieldSetElement',
  'HTMLFontElement',
  'HTMLFormElement',
  'HTMLFrameSetElement',
  'HTMLHeadElement',
  'HTMLHeadingElement',
  'HTMLHtmlElement',
  'HTMLHRElement',
  'HTMLIFrameElement',
  'HTMLImageElement',
  'HTMLInputElement',
  'HTMLKeygenElement',
  'HTMLLabelElement',
  'HTMLLegendElement',
  'HTMLLIElement',
  'HTMLLinkElement',
  'HTMLMapElement',
  'HTMLMediaElement',
  'HTMLMetaElement',
  'HTMLMeterElement',
  'HTMLModElement',
  'HTMLObjectElement',
  'HTMLOListElement',
  'HTMLOptGroupElement',
  'HTMLOptionElement',
  'HTMLOutputElement',
  'HTMLParagraphElement',
  'HTMLParamElement',
  'HTMLPreElement',
  'HTMLProgressElement',
  'HTMLQuoteElement',
  'HTMLScriptElement',
  'HTMLSelectElement',
  'HTMLSourceElement',
  'HTMLSpanElement',
  'HTMLStyleElement',
  'HTMLTableElement',
  'HTMLTableCaptionElement',
  'HTMLTableCellElement',
  'HTMLTableDataCellElement',
  'HTMLTableHeaderCellElement',
  'HTMLTableColElement',
  'HTMLTableRowElement',
  'HTMLTableSectionElement',
  'HTMLTemplateElement',
  'HTMLTextAreaElement',
  'HTMLTimeElement',
  'HTMLTitleElement',
  'HTMLTrackElement',
  'HTMLUListElement',
  'HTMLUnknownElement',
  'HTMLVideoElement',
  'MediaQueryList',
  'Navigator',
  'NodeList',
  'Storage',
]

describe('Window', () => {
  let instance

  beforeEach(() => {
    Document.mockReset()
    MediaQueryList.mockReset()
    Navigator.mockReset()
    Storage.mockReset()

    instance = new Window({
      includeBody: true,
      includeHead: true,
      userAgent: UA,
    })
  })

  itShouldImplementEventTargetInterface(() => instance)

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementWindowOrWorkerGlobalScope()
    expect(instance).toHaveEnumerables([
      'document',
      'localStorage',
      'navigator',
      'sessionStorage',
    ])
  })

  it('should not instantiate classes for lazily load properties', () => {
    expect(Document).not.toHaveBeenCalled()
    expect(Navigator).not.toHaveBeenCalled()
    expect(Storage).not.toHaveBeenCalled()
  })

  describe('destroy()', () => {
    beforeEach(() => {
      Document.destroy = jest.fn()
    })

    it('should destroy document when document has been accessed', () => {
      let tmp = instance.document // eslint-disable-line
      Window.destroy(instance)
      expect(Document.destroy).toHaveBeenCalledTimes(1)
      expect(Document.destroy).toHaveBeenCalledWith(instance.document)
    })

    it('should not destroy document when document has not been accessed', () => {
      Window.destroy(instance)
      expect(Document.destroy).not.toHaveBeenCalled()
    })
  })

  describe('when document property accessed', () => {
    let doc

    beforeEach(() => {
      doc = instance.document
    })

    it('should instantiate document property', () => {
      expect(Document).toHaveBeenCalledTimes(1)
      expect(Document).toHaveBeenCalledWith({
        includeBody: true,
        includeHead: true,
      })
      expect(doc).toBeInstanceOf(Document)
    })
  })

  describe('when localStorage property accessed', () => {
    let localStorage

    beforeEach(() => {
      localStorage = instance.localStorage
    })

    it('should instantiate localStorage property', () => {
      expect(Storage).toHaveBeenCalledTimes(1)
      expect(localStorage).toBeInstanceOf(Storage)
    })
  })

  describe('when navigator property accessed', () => {
    let navigator

    beforeEach(() => {
      navigator = instance.navigator
    })

    it('should instantiate navigator property', () => {
      expect(Navigator).toHaveBeenCalledTimes(1)
      expect(navigator).toBeInstanceOf(Navigator)
    })
  })

  describe('when sessionStorage property accessed', () => {
    let sessionStorage

    beforeEach(() => {
      sessionStorage = instance.sessionStorage
    })

    it('should instantiate sessionStorage property', () => {
      expect(Storage).toHaveBeenCalledTimes(1)
      expect(sessionStorage).toBeInstanceOf(Storage)
    })
  })

  it('matchMedia() returns new instance of MediaQueryList', () => {
    const media = 'foo'
    expect(instance.matchMedia(media)).toBeInstanceOf(MediaQueryList)
    expect(MediaQueryList).toHaveBeenCalledTimes(1)
    expect(MediaQueryList).toHaveBeenCalledWith(media)
  })

  MODULE_PROPERTIES.forEach(property => {
    describe(`when ${property} property accessed`, () => {
      let value

      beforeEach(() => {
        value = instance[property]
      })

      it('should reference expected module', () => {
        expect(value).toBe(require(join(__dirname, '..', property)))
      })
    })
  })
})
