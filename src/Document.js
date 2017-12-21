/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document
 */

import HTMLBodyElement from './HTMLBodyElement'
import HTMLHtmlElement from './HTMLHtmlElement'
import HTMLHeadElement from './HTMLHeadElement'
import nodeMixin from './mixins/Node'
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

class Document {
  documentElement: HTMLHtmlElement

  constructor({includeBody, includeHead}: DocumentOptions) {
    let documentElement

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      documentElement: {
        enumerable: false,
        get() {
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
    })

    // TODO: implement remaining properties
  }

  createElement(tagName: string, options: *) {
    const definition = TAG_NAME_DEFINITIONS[tagName.toLowerCase()]

    switch (typeof definition) {
      case 'string': {
        // $FlowFixMe - Flow doesn't like dynamic require statements
        const ElementClass = require(join(__dirname, definition)).default
        return new ElementClass({tagName, ...options})
      }

      default: {
        const HTMLUnknownElement = require('./HTMLUnknownElement').default
        return new HTMLUnknownElement({tagName, ...options})
      }
    }
  }

  // TODO: implement remaining methods
}

export default nodeMixin(Document)
