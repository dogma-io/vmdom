import Document from '../Document'
import HTMLBodyElement from '../HTMLBodyElement'
import UnmockedHTMLHtmlElement from '../HTMLHtmlElement'
import HTMLHeadElement from '../HTMLHeadElement'
import HTMLUnknownElement from '../HTMLUnknownElement'
import {itShouldImplementNodeInterface} from '../mixins/__tests__/Node.utils'
import {join} from 'path'

jest.doMock('../HTMLHtmlElement', () => {
  return jest.fn((...args) => {
    return UnmockedHTMLHtmlElement(...args)
  })
})

const HTMLHtmlElement = require('../HTMLHtmlElement')

const TAG_NAME_DEFINITIONS = {
  a: 'HTMLAnchorElement',
  abbr: 'HTMLElement',
  address: 'HTMLElement',
  area: 'HTMLAreaElement',
  article: 'HTMLElement',
  aside: 'HTMLElement',
  audio: 'HTMLAudioElement',
  b: 'HTMLElement',
  base: 'HTMLBaseElement',
  bdi: 'HTMLElement',
  bdo: 'HTMLElement',
  blockquote: 'HTMLQuoteElement',
  body: 'HTMLBodyElement',
  br: 'HTMLBRElement',
  button: 'HTMLButtonElement',
  canvas: 'HTMLCanvasElement',
  caption: 'HTMLTableCaptionElement',
  center: 'HTMLElement',
  cite: 'HTMLElement',
  code: 'HTMLElement',
  col: 'HTMLTableColElement',
  colgroup: 'HTMLTableColElement',
  data: 'HTMLDataElement',
  datalist: 'HTMLDataListElement',
  dd: 'HTMLElement',
  del: 'HTMLModElement',
  details: 'HTMLDetailsElement',
  dfn: 'HTMLElement',
  dialog: 'HTMLDialogElement',
  div: 'HTMLDivElement',
  dl: 'HTMLDListElement',
  dt: 'HTMLElement',
  em: 'HTMLElement',
  embed: 'HTMLEmbedElement',
  fieldset: 'HTMLFieldSetElement',
  figcaption: 'HTMLElement',
  figure: 'HTMLElement',
  font: 'HTMLFontElement',
  footer: 'HTMLElement',
  form: 'HTMLFormElement',
  frameset: 'HTMLFrameSetElement',
  h1: 'HTMLHeadingElement',
  h2: 'HTMLHeadingElement',
  h3: 'HTMLHeadingElement',
  h4: 'HTMLHeadingElement',
  h5: 'HTMLHeadingElement',
  h6: 'HTMLHeadingElement',
  header: 'HTMLElement',
  hgroup: 'HTMLElement',
  hr: 'HTMLHRElement',
  // TODO: get test for html working as it is mocked in this module
  // html: 'HTMLHtmlElement',
  i: 'HTMLElement',
  image: 'HTMLImageElement',
  img: 'HTMLImageElement',
  input: 'HTMLInputElement',
  ins: 'HTMLModElement',
  kbd: 'HTMLElement',
  label: 'HTMLLabelElement',
  legend: 'HTMLLegendElement',
  li: 'HTMLLIElement',
  link: 'HTMLLinkElement',
  main: 'HTMLElement',
  map: 'HTMLMapElement',
  mark: 'HTMLElement',
  meta: 'HTMLMetaElement',
  meter: 'HTMLMeterElement',
  nav: 'HTMLElement',
  noscript: 'HTMLElement',
  object: 'HTMLObjectElement',
  ol: 'HTMLOListElement',
  optgroup: 'HTMLOptGroupElement',
  option: 'HTMLOptionElement',
  output: 'HTMLOutputElement',
  p: 'HTMLParagraphElement',
  param: 'HTMLParamElement',
  picture: 'HTMLPictureElement',
  pre: 'HTMLPreElement',
  progress: 'HTMLProgressElement',
  q: 'HTMLQuoteElement',
  rp: 'HTMLElement',
  rt: 'HTMLElement',
  rtc: 'HTMLElement',
  ruby: 'HTMLElement',
  s: 'HTMLElement',
  samp: 'HTMLElement',
  script: 'HTMLScriptElement',
  section: 'HTMLElement',
  select: 'HTMLSelectElement',
  slot: 'HTMLSlotElement',
  small: 'HTMLElement',
  span: 'HTMLSpanElement',
  source: 'HTMLSourceElement',
  strong: 'HTMLElement',
  style: 'HTMLStyleElement',
  sub: 'HTMLElement',
  summary: 'HTMLElement',
  sup: 'HTMLElement',
  table: 'HTMLTableElement',
  tbody: 'HTMLTableSectionElement',
  td: 'HTMLTableDataCellElement',
  template: 'HTMLTemplateElement',
  textarea: 'HTMLTextAreaElement',
  tfoot: 'HTMLTableSectionElement',
  th: 'HTMLTableHeaderCellElement',
  thead: 'HTMLTableSectionElement',
  time: 'HTMLTimeElement',
  tr: 'HTMLTableRowElement',
  track: 'HTMLTrackElement',
  u: 'HTMLElement',
  ul: 'HTMLUListElement',
  var: 'HTMLElement',
  video: 'HTMLVideoElement',
  wbr: 'HTMLElement',
}

describe('Document', () => {
  let instance

  describe('when includeBody option is set to true', () => {
    describe('when includeHead option is set to true', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: true,
          includeHead: true,
        })
      })

      itShouldImplementNodeInterface(() => instance)

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLHtmlElement)
          expect(documentElement.childNodes).toHaveLength(2)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLHeadElement)
          expect(documentElement.childNodes[1]).toBeInstanceOf(HTMLBodyElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })

    describe('when includeHead option is set to false', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: true,
          includeHead: false,
        })
      })

      itShouldImplementNodeInterface(() => instance)

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLHtmlElement)
          expect(documentElement.childNodes).toHaveLength(1)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLBodyElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })
  })

  describe('when includeBody option is set to false', () => {
    describe('when includeHead option is set to true', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: false,
          includeHead: true,
        })
      })

      itShouldImplementNodeInterface(() => instance)

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLHtmlElement)
          expect(documentElement.childNodes).toHaveLength(1)
          expect(documentElement.childNodes[0]).toBeInstanceOf(HTMLHeadElement)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })

    describe('when includeHead option is set to false', () => {
      beforeEach(() => {
        instance = new Document({
          includeBody: false,
          includeHead: false,
        })
      })

      itShouldImplementNodeInterface(() => instance)

      it('should implement expected interfaces and has correct enumerables', () => {
        expect(instance).toImplementEventTarget()
        expect(instance).toImplementNode()
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      describe('when documentElement property accessed', () => {
        let documentElement

        beforeEach(() => {
          documentElement = instance.documentElement
        })

        it('should instantiate document property', () => {
          expect(documentElement).toBeInstanceOf(UnmockedHTMLHtmlElement)
          expect(documentElement.childNodes).toHaveLength(0)
        })

        it('should return same instance when accessed a second time', () => {
          expect(instance.documentElement).toBe(documentElement)
        })
      })
    })
  })

  describe('createElement()', () => {
    beforeAll(() => {
      instance = new Document({
        includeHead: false,
        includeBody: false,
      })
    })

    Object.keys(TAG_NAME_DEFINITIONS).forEach(tagName => {
      const className = TAG_NAME_DEFINITIONS[tagName]
      const desc = `should return instance of ${className} for tag name "${
        tagName
      }"`

      it(desc, () => {
        const Class = require(join(__dirname, '..', className)).default
        expect(instance.createElement(tagName)).toBeInstanceOf(Class)
      })
    })

    it('should return instance of HTMLUnknownElement for unknown tag name', () => {
      expect(instance.createElement('does-not-exist')).toBeInstanceOf(
        HTMLUnknownElement,
      )
    })
  })
})
