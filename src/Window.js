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

function d<T>(
  value: T,
): {|
  enumerable: boolean,
  value: T,
  writable: boolean,
|} {
  return {
    enumerable: false,
    value,
    writable: false,
  }
}

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadInstanceAsProp
  Array: *
  Boolean: *
  Date: *
  document: Document
  Error: *
  EvalError: *
  Function: *
  JSON: *
  localStorage: Storage
  Map: *
  Math: *
  Number: *
  navigator: Navigator
  Object: *
  Promise: *
  RangeError: *
  ReferenceError: *
  RegExp: *
  sessionStorage: Storage
  Set: *
  String: *
  Symbol: *
  SyntaxError: *
  TypeError: *
  URIError: *
  WeakMap: *
  WeakSet: *

  constructor({includeBody, includeHead, userAgent}: WindowOptions) {
    lazilyLoadInstanceAsProp(this, 'document', Document, [
      {includeBody, includeHead},
    ])

    lazilyLoadInstanceAsProp(this, 'localStorage', Storage)
    lazilyLoadInstanceAsProp(this, 'navigator', Navigator, [userAgent])
    lazilyLoadInstanceAsProp(this, 'sessionStorage', Storage)

    MODULE_PROPERTIES.forEach((name: string) => {
      lazilyLoadModuleAsProp(this, name, join(__dirname, name), require)
    })

    Object.defineProperties(this, {
      Array: d(Array),
      Boolean: d(Boolean),
      Date: d(Date),
      Error: d(Error),
      EvalError: d(EvalError),
      Function: d(Function),
      JSON: d(JSON),
      Map: d(Map),
      Math: d(Math),
      Number: d(Number),
      Object: d(Object),
      Promise: d(Promise),
      RangeError: d(RangeError),
      ReferenceError: d(ReferenceError),
      RegExp: d(RegExp),
      Set: d(Set),
      String: d(String),
      Symbol: d(Symbol),
      SyntaxError: d(SyntaxError),
      TypeError: d(TypeError),
      URIError: d(URIError),
      WeakMap: d(WeakMap),
      WeakSet: d(WeakSet),
    })
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }

  isFinite(testValue: *): boolean {
    return isFinite(testValue)
  }

  isNaN(value: *): boolean {
    return isNaN(value)
  }

  matchMedia(mediaQuery: string): * {
    const MediaQueryList = require('./MediaQueryList').default
    return new MediaQueryList(mediaQuery)
  }

  parseFloat(value: *): number {
    return parseFloat(value)
  }

  parseInt(value: *, radix: number): number {
    return parseInt(value, radix)
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
