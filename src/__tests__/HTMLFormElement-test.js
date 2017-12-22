import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLFormElement from '../HTMLFormElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLFormElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLFormElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'form')

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})
