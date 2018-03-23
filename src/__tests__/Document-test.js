import Comment from '../Comment'
import Document from '../Document'
import DocumentFragment from '../DocumentFragment'
import HTMLBodyElement from '../HTMLBodyElement'
import HTMLFrameSetElement from '../HTMLFrameSetElement'
import UnmockedHTMLHtmlElement from '../HTMLHtmlElement'
import HTMLHeadElement from '../HTMLHeadElement'
import HTMLUnknownElement from '../HTMLUnknownElement'
import Text from '../Text'
import {itShouldImplementNodeInterface} from './Node.utils'

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

      it('should have expected enumerables', () => {
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      it('should return head element for head property', () => {
        expect(instance.head).toBeInstanceOf(HTMLHeadElement)
        expect(instance.head).toBe(instance.documentElement.childNodes[0])
      })

      it('should return null for head when head is removed from document', () => {
        instance.documentElement.removeChild(instance.head)
        expect(instance.head).toBe(null)
      })

      it('should return body element for body property', () => {
        expect(instance.body).toBeInstanceOf(HTMLBodyElement)
        expect(instance.body).toBe(instance.documentElement.childNodes[1])
      })

      it('should return null for body when body is removed from document', () => {
        instance.documentElement.removeChild(instance.body)
        expect(instance.body).toBe(null)
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

      it('should have expected enumerables', () => {
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      it('should return null for head property', () => {
        expect(instance.head).toBe(null)
      })

      it('should return body element for body property', () => {
        expect(instance.body).toBeInstanceOf(HTMLBodyElement)
        expect(instance.body).toBe(instance.documentElement.childNodes[0])
      })

      it('should return null for body when body is removed from document', () => {
        instance.documentElement.removeChild(instance.body)
        expect(instance.body).toBe(null)
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

      it('should have expected enumerables', () => {
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      it('should return head element for head property', () => {
        expect(instance.head).toBeInstanceOf(HTMLHeadElement)
        expect(instance.head).toBe(instance.documentElement.childNodes[0])
      })

      it('should return null for head when head is removed from document', () => {
        instance.documentElement.removeChild(instance.head)
        expect(instance.head).toBe(null)
      })

      it('should return null for body property', () => {
        expect(instance.body).toBe(null)
      })

      it('should return frame set element for body when frame set added to document', () => {
        instance.documentElement.appendChild(new HTMLFrameSetElement())
        expect(instance.body).toBeInstanceOf(HTMLFrameSetElement)
        expect(instance.body).toBe(instance.documentElement.childNodes[1])
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

      it('should have expected enumerables', () => {
        expect(instance).toHaveEnumerables([])
      })

      it('should not instantiate classes for lazily load properties', () => {
        expect(HTMLHtmlElement).not.toHaveBeenCalled()
      })

      it('should return null for head property', () => {
        expect(instance.head).toBe(null)
      })

      it('should return null for body property', () => {
        expect(instance.body).toBe(null)
      })

      it('should return frame set element for body when frame set added to document', () => {
        instance.documentElement.appendChild(new HTMLFrameSetElement())
        expect(instance.body).toBeInstanceOf(HTMLFrameSetElement)
        expect(instance.body).toBe(instance.documentElement.childNodes[0])
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

      describe('createComment()', () => {
        it('should not be overwritable', () => {
          expect(() => {
            instance.createComment = 'foo'
          }).toThrow(TypeError)
        })

        it('should return instance of Comment for boolean data', () => {
          const textNode = instance.createComment(true)
          expect(textNode).toBeInstanceOf(Comment)
          expect(textNode.data).toBe('true')
        })

        it('should return instance of Comment for null data', () => {
          const textNode = instance.createComment(null)
          expect(textNode).toBeInstanceOf(Comment)
          expect(textNode.data).toBe('null')
        })

        it('should return instance of Comment for numeric data', () => {
          const textNode = instance.createComment(2)
          expect(textNode).toBeInstanceOf(Comment)
          expect(textNode.data).toBe('2')
        })

        it('should return instance of Comment for string data', () => {
          const textNode = instance.createComment('foo')
          expect(textNode).toBeInstanceOf(Comment)
          expect(textNode.data).toBe('foo')
        })

        it('should throw for symbol data', () => {
          expect(() => {
            instance.createComment(Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should return instance of Comment for undefined data', () => {
          const textNode = instance.createComment(undefined)
          expect(textNode).toBeInstanceOf(Comment)
          expect(textNode.data).toBe('undefined')
        })
      })

      describe('createDocumentFragment()', () => {
        it('should not be overwritable', () => {
          expect(() => {
            instance.createDocumentFragment = 'foo'
          }).toThrow(TypeError)
        })

        it('should return a new document fragment', () => {
          expect(instance.createDocumentFragment()).toBeInstanceOf(
            DocumentFragment,
          )
        })
      })

      describe('createElement()', () => {
        it('should not be overwritable', () => {
          expect(() => {
            instance.createElement = 'foo'
          }).toThrow(TypeError)
        })

        Object.keys(TAG_NAME_DEFINITIONS).forEach(tagName => {
          const className = TAG_NAME_DEFINITIONS[tagName]
          const desc = `should return instance of ${className} for tag name "${tagName}"`

          it(desc, () => {
            const Class = require(`../${className}`).default
            expect(instance.createElement(tagName)).toBeInstanceOf(Class)
          })
        })

        it('should return instance of HTMLUnknownElement for unknown tag name', () => {
          expect(instance.createElement('does-not-exist')).toBeInstanceOf(
            HTMLUnknownElement,
          )
        })
      })

      describe('createTextNode()', () => {
        it('should not be overwritable', () => {
          expect(() => {
            instance.createTextNode = 'foo'
          }).toThrow(TypeError)
        })

        it('should return instance of Text for boolean data', () => {
          const textNode = instance.createTextNode(true)
          expect(textNode).toBeInstanceOf(Text)
          expect(textNode.data).toBe('true')
        })

        it('should return instance of Text for null data', () => {
          const textNode = instance.createTextNode(null)
          expect(textNode).toBeInstanceOf(Text)
          expect(textNode.data).toBe('null')
        })

        it('should return instance of Text for numeric data', () => {
          const textNode = instance.createTextNode(2)
          expect(textNode).toBeInstanceOf(Text)
          expect(textNode.data).toBe('2')
        })

        it('should return instance of Text for string data', () => {
          const textNode = instance.createTextNode('foo')
          expect(textNode).toBeInstanceOf(Text)
          expect(textNode.data).toBe('foo')
        })

        it('should throw for symbol data', () => {
          expect(() => {
            instance.createTextNode(Symbol('foo'))
          }).toThrow(TypeError)
        })

        it('should return instance of Text for undefined data', () => {
          const textNode = instance.createTextNode(undefined)
          expect(textNode).toBeInstanceOf(Text)
          expect(textNode.data).toBe('undefined')
        })
      })
    })
  })
})
