import {ELEMENT_EVENT_HANDLERS} from '../Element'
import HTMLDivElement from '../HTMLDivElement'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLDivElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLDivElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'div')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})
