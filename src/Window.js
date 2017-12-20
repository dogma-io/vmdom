/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 */

import Document from './Document'
import eventTargetMixin from './mixins/EventTarget'
import windowOrWorkerGlobalScopeMixin from './mixins/WindowOrWorkerGlobalScope'
import Navigator from './Navigator'
import {lazilyLoadProp} from './utils'

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

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadProp
  document: Document
  navigator: Navigator

  constructor({includeBody, includeHead, userAgent}: WindowOptions) {
    lazilyLoadProp(this, 'document', Document, [{includeBody, includeHead}])
    lazilyLoadProp(this, 'navigator', Navigator, [userAgent])
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
