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
  document: Document

  constructor() {
    lazilyLoadProp(this, 'document', Document)
  }
}

export default windowOrWorkerGlobalScopeMixin(eventTargetMixin(Window))
