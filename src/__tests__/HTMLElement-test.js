import {ELEMENT_EVENT_HANDLERS} from '../Element'
import HTMLElement, {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLElement({tagName: 'html'})
  })

  itShouldBeAnHTMLElement(() => instance, 'html')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})
