/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window
 */

import Document from './Document'
import eventTargetMixin from './mixins/EventTarget'
import windowOrWorkerGlobalScopeMixin from './mixins/WindowOrWorkerGlobalScope'
import {lazilyLoadProp} from './utils'

class Window {
  _isLoaded: {[property: string]: boolean} // used by lazilyLoadProp
  document: Document

  constructor() {
    lazilyLoadProp(this, 'document', Document)
  }

  static destroy(instance: Document) {
    if (instance._isLoaded.document) {
      Document.destroy(instance.document)
    }
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
