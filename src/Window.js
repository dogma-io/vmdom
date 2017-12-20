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

type WindowOptions = {
  userAgent?: string,
}

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadProp
  document: Document
  navigator: Navigator

  constructor({userAgent}: WindowOptions) {
    lazilyLoadProp(this, 'document', Document)
    lazilyLoadProp(this, 'navigator', Navigator, [userAgent])
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
