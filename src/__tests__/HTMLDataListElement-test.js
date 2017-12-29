import {ELEMENT_EVENT_HANDLERS} from '../Element'
import HTMLDataListElement from '../HTMLDataListElement'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLDataListElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLDataListElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'datalist')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})
