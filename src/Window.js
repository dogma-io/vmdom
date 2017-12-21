/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 */

import Document from './Document'
import eventTargetMixin from './mixins/EventTarget'
import windowOrWorkerGlobalScopeMixin from './mixins/WindowOrWorkerGlobalScope'
import Navigator from './Navigator'
import Storage from './Storage'
import {lazilyLoadInstanceAsProp, lazilyLoadModuleAsProp} from './utils'
import {join} from 'path'

type WindowOptions = {|
  /**
   * Whether or not to insert a HTMLHeadElement in document.documentElement
   */
  includeBody: boolean,

  /**
   * Whether or not to insert a HTMLHeadElement in document.documentElement
   */
  includeHead: boolean,

  /**
   * The user agent to pretend we are.
   */
  userAgent: string,
|}

// TODO: add missing interfaces from:
//   https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
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

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadInstanceAsProp
  document: Document
  localStorage: Storage
  navigator: Navigator
  sessionStorage: Storage

  constructor({includeBody, includeHead, userAgent}: WindowOptions) {
    lazilyLoadInstanceAsProp(this, 'document', Document, [
      {includeBody, includeHead},
    ])

    lazilyLoadInstanceAsProp(this, 'localStorage', Storage)
    lazilyLoadInstanceAsProp(this, 'navigator', Navigator, [userAgent])
    lazilyLoadInstanceAsProp(this, 'sessionStorage', Storage)

    MODULE_PROPERTIES.forEach(name => {
      lazilyLoadModuleAsProp(this, name, join(__dirname, name), require)
    })
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }

  matchMedia(mediaQuery: string) {
    const MediaQueryList = require('./MediaQueryList').default
    return new MediaQueryList(mediaQuery)
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
