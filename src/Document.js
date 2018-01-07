/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import HTMLBodyElement from './HTMLBodyElement'
import HTMLHtmlElement from './HTMLHtmlElement'
import HTMLHeadElement from './HTMLHeadElement'
import Node from './Node'
import {join} from 'path'

type DocumentOptions = {|
  /**
   * Whether or not to insert a HTMLHeadElement in documentElement
   */
  includeBody: boolean,

  /**
   * Whether or not to insert a HTMLHeadElement in documentElement
   */
  includeHead: boolean,
|}

const TAG_NAME_DEFINITIONS = {
  a: 'HTMLAnchorElement',
  abbr: 'HTMLElement',
  // acronym
  address: 'HTMLElement',
  // applet
  area: 'HTMLAreaElement',
  article: 'HTMLElement',
  aside: 'HTMLElement',
  audio: 'HTMLAudioElement',
  b: 'HTMLElement',
  base: 'HTMLBaseElement',
  bdi: 'HTMLElement',
  bdo: 'HTMLElement',
  // big
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
  // frame
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
  html: 'HTMLHtmlElement',
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
  // marquee
  meta: 'HTMLMetaElement',
  meter: 'HTMLMeterElement',
  nav: 'HTMLElement',
  // noembed
  // noframes
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
  // strike
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
  // tt
  u: 'HTMLElement',
  ul: 'HTMLUListElement',
  var: 'HTMLElement',
  video: 'HTMLVideoElement',
  wbr: 'HTMLElement',
  // xmp
}

export default class Document extends Node {
  body: ?HTMLBodyElement
  documentElement: HTMLHtmlElement

  constructor({includeBody, includeHead}: DocumentOptions) {
    super()

    let documentElement

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      body: {
        enumerable: false,
        get(): * {
          // TODO: cache result so we don't have to lookup every time and use
          // MutationObserver to determine if/when body is removed from DOM
          // so cached result remains accurate
          const HTMLFrameSetElement = require('./HTMLFrameSetElement').default
          const {childNodes} = this.documentElement

          for (let i = childNodes.length; i >= 0; i--) {
            const node = childNodes[i]

            if (
              node instanceof HTMLBodyElement ||
              node instanceof HTMLFrameSetElement
            ) {
              return node
            }
          }

          return null
        },
      },
      documentElement: {
        enumerable: false,
        get(): HTMLHtmlElement {
          if (!documentElement) {
            documentElement = new HTMLHtmlElement()

            if (includeHead) {
              documentElement.appendChild(new HTMLHeadElement())
            }

            if (includeBody) {
              documentElement.appendChild(new HTMLBodyElement())
            }
          }

          return documentElement
        },
      },
      head: {
        enumerable: false,
        get(): ?HTMLHeadElement {
          // TODO: cache result so we don't have to lookup every time and use
          // MutationObserver to determine if/when body is removed from DOM
          // so cached result remains accurate
          const {childNodes} = this.documentElement

          for (let i = 0, len = childNodes.length; i < len; i++) {
            const node = childNodes[i]

            if (node instanceof HTMLHeadElement) {
              return node
            }
          }

          return null
        },
      },
    })

    // TODO: implement remaining properties
  }

  // TODO: implement adoptNode
  // TODO: implement close
  // TODO: implement createAttribute
  // TODO: implement createAttributeNS
  // TODO: implement createCDATASection

  createComment(data: *): * {
    const Comment = require('./Comment').default
    return new Comment(`${data}`)
  }

  createDocumentFragment(): * {
    const DocumentFragment = require('./DocumentFragment').default
    return new DocumentFragment()
  }

  createElement(tagName: string, options: *): * {
    const definition = TAG_NAME_DEFINITIONS[tagName.toLowerCase()]

    switch (typeof definition) {
      case 'string': {
        // $FlowFixMe - Flow doesn't like dynamic require statements
        const ElementClass = require(join(__dirname, definition)).default
        return new ElementClass(Object.assign({tagName}, options))
      }

      default: {
        const HTMLUnknownElement = require('./HTMLUnknownElement').default
        return new HTMLUnknownElement(Object.assign({tagName}, options))
      }
    }
  }

  // TODO: implement createElementNS
  // TODO: implement createEvent
  // TODO: implement createExpression
  // TODO: implement createNodeIterator
  // TODO: implement createNSResolver

  createTextNode(data: *): * {
    const Text = require('./Text').default
    return new Text(`${data}`)
  }

  // TODO: implement createTouchList
  // TODO: implement createTreeWalker
  // TODO: implement enableStyleSheetsForSet
  // TODO: implement evaluate
  // TODO: implement execCommand
  // TODO: implement getElementById
  // TODO: implement getElementsByClassName
  // TODO: implement getElementsByName
  // TODO: implement getElementsByTagName
  // TODO: implement getElementsByTagNameNS
  // TODO: implement getSelection
  // TODO: implement hasFocus
  // TODO: implement importNode
  // TODO: implement open
  // TODO: implement queryCommandEnabled
  // TODO: implement queryCommandIndeterm
  // TODO: implement queryCommandState
  // TODO: implement queryCommandSupported
  // TODO: implement queryCommandValue
  // TODO: implement querySelector
  // TODO: implement querySelectorAll
  // TODO: implement write
  // TODO: implement writeln
}
