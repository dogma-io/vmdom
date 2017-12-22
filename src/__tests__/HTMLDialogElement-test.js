import {ELEMENT_EVENT_HANDLERS} from '../Element'
import HTMLDialogElement from '../HTMLDialogElement'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLDialogElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLDialogElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'dialog')

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})
