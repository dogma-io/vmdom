jest.mock('../Document')
jest.mock('../MediaQueryList')
jest.mock('../Navigator')
jest.mock('../Storage')
jest.mock('node-fetch')

import Document from '../Document'
import MediaQueryList from '../MediaQueryList'
import Navigator from '../Navigator'
import Storage from '../Storage'
import Window from '../Window'
import {itShouldImplementEventTargetInterface} from '../mixins/__tests__/EventTarget.utils'
import {itShouldImplementWindowOrWorkerGlobalScopeInterface} from '../mixins/__tests__/WindowOrWorkerGlobalScope.utils'

const UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

const MODULE_PROPERTIES = [
  'Document',
  'DOMException',
  'DOMParser',
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

const GLOBAL_PROPERTIES = [
  'Array',
  'Boolean',
  'Date',
  'Error',
  'EvalError',
  'Function',
  'JSON',
  'Map',
  'Math',
  'Number',
  'Object',
  'Promise',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'URIError',
  'WeakMap',
  'WeakSet',
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
  itShouldImplementWindowOrWorkerGlobalScopeInterface(() => instance)

  it('should have expected enumerables', () => {
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

  describe('isFinite()', () => {
    it('should return true when value is a boolean', () => {
      expect(instance.isFinite(true)).toBe(true)
    })

    it('should return false when value is Infinity', () => {
      expect(instance.isFinite(Infinity)).toBe(false)
    })

    it('should return false when value is -Infinity', () => {
      expect(instance.isFinite(-Infinity)).toBe(false)
    })

    it('should return false when value is NaN', () => {
      expect(instance.isFinite(NaN)).toBe(false)
    })

    it('should return true when value is null', () => {
      expect(instance.isFinite(null)).toBe(true)
    })

    it('should return true when value is number 0', () => {
      expect(instance.isFinite(0)).toBe(true)
    })

    it('should return true when value is number 42', () => {
      expect(instance.isFinite(0)).toBe(true)
    })

    it('should return true when value is number 1e10', () => {
      expect(instance.isFinite(1e10)).toBe(true)
    })

    it('should return false when value is a string', () => {
      expect(instance.isFinite('test')).toBe(false)
    })

    it('should return true when value is string 0', () => {
      expect(instance.isFinite('0')).toBe(true)
    })

    it('should throw when value is a Symbol', () => {
      expect(() => {
        instance.isNaN(Symbol('test'))
      }).toThrow(TypeError)
    })

    it('should return true when value is undefined', () => {
      expect(instance.isNaN(undefined)).toBe(true)
    })
  })

  describe('isNaN()', () => {
    it('should return false when value is a boolean', () => {
      expect(instance.isNaN(true)).toBe(false)
    })

    it('should return false when value is Infinity', () => {
      expect(instance.isNaN(Infinity)).toBe(false)
    })

    it('should return false when value is -Infinity', () => {
      expect(instance.isNaN(-Infinity)).toBe(false)
    })

    it('should return true when value is NaN', () => {
      expect(instance.isNaN(NaN)).toBe(true)
    })

    it('should return false when value is null', () => {
      expect(instance.isNaN(null)).toBe(false)
    })

    it('should return false when value is a number', () => {
      expect(instance.isNaN(42)).toBe(false)
    })

    it('should return true when value is a string', () => {
      expect(instance.isNaN('test')).toBe(true)
    })

    it('should throw when value is a Symbol', () => {
      expect(() => {
        instance.isNaN(Symbol('test'))
      }).toThrow(TypeError)
    })

    it('should return true when value is undefined', () => {
      expect(instance.isNaN(undefined)).toBe(true)
    })
  })

  it('matchMedia() returns new instance of MediaQueryList', () => {
    const media = 'foo'
    expect(instance.matchMedia(media)).toBeInstanceOf(MediaQueryList)
    expect(MediaQueryList).toHaveBeenCalledTimes(1)
    expect(MediaQueryList).toHaveBeenCalledWith(media)
  })

  describe('parseFloat()', () => {
    it('should return NaN when value is a boolean', () => {
      expect(instance.parseFloat(true)).toBe(NaN)
    })

    it('should return Infinity when value is Infinity', () => {
      expect(instance.parseFloat(Infinity)).toBe(Infinity)
    })

    it('should return -Infinity when value is -Infinity', () => {
      expect(instance.parseFloat(-Infinity)).toBe(-Infinity)
    })

    it('should return NaN when value is NaN', () => {
      expect(instance.parseFloat(NaN)).toBe(NaN)
    })

    it('should return NaN when value is null', () => {
      expect(instance.parseFloat(null)).toBe(NaN)
    })

    it('should return 0 when value is number 0', () => {
      expect(instance.parseFloat(0)).toBe(0)
    })

    it('should return 0.5 when value is number 0.5', () => {
      expect(instance.parseFloat(0.5)).toBe(0.5)
    })

    it('should return 42 when value is number 42', () => {
      expect(instance.parseFloat(42)).toBe(42)
    })

    it('should return 42.5 when value is number 42.5', () => {
      expect(instance.parseFloat(42.5)).toBe(42.5)
    })

    it('should return 10000000000 when value is number 1e10', () => {
      expect(instance.parseFloat(1e10)).toBe(10000000000)
    })

    it('should return NaN when value is a string', () => {
      expect(instance.parseFloat('test')).toBe(NaN)
    })

    it('should return 0 when value is string 0', () => {
      expect(instance.parseFloat('0')).toBe(0)
    })

    it('should return 0.5 when value is string .5', () => {
      expect(instance.parseFloat('.5')).toBe(0.5)
    })

    it('should return 0.5 when value is string 0.5', () => {
      expect(instance.parseFloat('0.5')).toBe(0.5)
    })

    it('should throw when value is a Symbol', () => {
      expect(() => {
        instance.parseFloat(Symbol('test'))
      }).toThrow(TypeError)
    })

    it('should return NaN when value is undefined', () => {
      expect(instance.parseFloat(undefined)).toBe(NaN)
    })
  })

  describe('parseInt()', () => {
    describe('when radix omitted', () => {
      it('should return NaN when value is a boolean', () => {
        expect(instance.parseInt(true)).toBe(NaN)
      })

      it('should return NaN when value is Infinity', () => {
        expect(instance.parseInt(Infinity)).toBe(NaN)
      })

      it('should return NaN when value is -Infinity', () => {
        expect(instance.parseInt(-Infinity)).toBe(NaN)
      })

      it('should return NaN when value is NaN', () => {
        expect(instance.parseInt(NaN)).toBe(NaN)
      })

      it('should return NaN when value is null', () => {
        expect(instance.parseInt(null)).toBe(NaN)
      })

      it('should return 0 when value is number 0', () => {
        expect(instance.parseInt(0)).toBe(0)
      })

      it('should return 42 when value is number 42', () => {
        expect(instance.parseInt(42)).toBe(42)
      })

      it('should return 10000000000 when value is number 1e10', () => {
        expect(instance.parseInt(1e10)).toBe(10000000000)
      })

      it('should return NaN when value is a string', () => {
        expect(instance.parseInt('test')).toBe(NaN)
      })

      it('should return 0 when value is string 0', () => {
        expect(instance.parseInt('0')).toBe(0)
      })

      it('should throw when value is a Symbol', () => {
        expect(() => {
          instance.parseInt(Symbol('test'))
        }).toThrow(TypeError)
      })

      it('should return NaN when value is undefined', () => {
        expect(instance.parseInt(undefined)).toBe(NaN)
      })
    })

    describe('when radix is 10', () => {
      it('should return NaN when value is a boolean', () => {
        expect(instance.parseInt(true, 10)).toBe(NaN)
      })

      it('should return NaN when value is Infinity', () => {
        expect(instance.parseInt(Infinity, 10)).toBe(NaN)
      })

      it('should return NaN when value is -Infinity', () => {
        expect(instance.parseInt(-Infinity, 10)).toBe(NaN)
      })

      it('should return NaN when value is NaN', () => {
        expect(instance.parseInt(NaN, 10)).toBe(NaN)
      })

      it('should return NaN when value is null', () => {
        expect(instance.parseInt(null, 10)).toBe(NaN)
      })

      it('should return 0 when value is number 0', () => {
        expect(instance.parseInt(0, 10)).toBe(0)
      })

      it('should return 42 when value is number 42', () => {
        expect(instance.parseInt(42, 10)).toBe(42)
      })

      it('should return 10000000000 when value is number 1e10', () => {
        expect(instance.parseInt(1e10, 10)).toBe(10000000000)
      })

      it('should return NaN when value is a string', () => {
        expect(instance.parseInt('test', 10)).toBe(NaN)
      })

      it('should return 0 when value is string 0', () => {
        expect(instance.parseInt('0', 10)).toBe(0)
      })

      it('should throw when value is a Symbol', () => {
        expect(() => {
          instance.parseInt(Symbol('test'), 10)
        }).toThrow(TypeError)
      })

      it('should return NaN when value is undefined', () => {
        expect(instance.parseInt(undefined, 10)).toBe(NaN)
      })
    })
  })

  MODULE_PROPERTIES.forEach(property => {
    describe(`when ${property} property accessed`, () => {
      let value

      beforeEach(() => {
        value = instance[property]
      })

      it('should reference expected module', () => {
        expect(value).toBe(require(`../${property}`))
      })
    })
  })

  GLOBAL_PROPERTIES.forEach(property => {
    it(`should have property reference to ${property}`, () => {
      expect(instance[property]).toBe(global[property])
    })
  })
})
