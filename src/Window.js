/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 */

import Document from './Document'
import MediaQueryList from './MediaQueryList'
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

const GLOBAL_PROPERTIES = [
  'Array',
  'Boolean',
  'Date',
  'Error',
  'EvalError',
  'Function',
  'isFinite',
  'isNaN',
  'JSON',
  'Map',
  'Math',
  'Number',
  'Object',
  'parseFloat',
  'parseInt',
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

// TODO: add missing interfaces from:
//   https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
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

const matchMedia = (mediaQuery: string): MediaQueryList => {
  return new MediaQueryList(mediaQuery)
}

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadInstanceAsProp
  Array: typeof Array
  Boolean: typeof Boolean // eslint-disable-line
  Date: typeof Date
  document: Document
  Error: typeof Error
  EvalError: typeof EvalError
  Function: typeof Function // eslint-disable-line
  JSON: typeof JSON
  isFinite: (testValue: *) => boolean
  isNaN: (value: *) => boolean
  localStorage: Storage
  Map: typeof Map
  matchMedia: (mediaQuery: string) => MediaQueryList
  Math: typeof Math
  Number: typeof Number // eslint-disable-line
  navigator: Navigator
  Object: typeof Object // eslint-disable-line
  parseFloat: (value: *) => number
  parseInt: (value: *, radix: number) => number
  Promise: typeof Promise
  RangeError: typeof RangeError
  ReferenceError: typeof ReferenceError
  RegExp: typeof RegExp
  sessionStorage: Storage
  Set: typeof Set
  String: typeof String // eslint-disable-line
  Symbol: typeof Symbol
  SyntaxError: typeof SyntaxError
  TypeError: typeof TypeError
  URIError: typeof URIError
  WeakMap: typeof WeakMap
  WeakSet: typeof WeakSet

  constructor({includeBody, includeHead, userAgent}: WindowOptions) {
    lazilyLoadInstanceAsProp(this, 'document', Document, {
      args: [{includeBody, includeHead}],
    })

    lazilyLoadInstanceAsProp(this, 'localStorage', Storage)
    lazilyLoadInstanceAsProp(this, 'navigator', Navigator, {args: [userAgent]})
    lazilyLoadInstanceAsProp(this, 'sessionStorage', Storage)

    GLOBAL_PROPERTIES.forEach((key: string) => {
      Object.defineProperty(this, key, {
        enumerable: false,
        value: global[key],
        writable: false,
      })
    })

    MODULE_PROPERTIES.forEach((name: string) => {
      lazilyLoadModuleAsProp(this, name, join(__dirname, name), require)
    })

    Object.defineProperty(this, 'matchMedia', {
      enumerable: false,
      value: matchMedia,
      writable: false,
    })
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
