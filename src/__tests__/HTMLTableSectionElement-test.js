import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLTableSectionElement from '../HTMLTableSectionElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLTableSectionElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLTableSectionElement({tagName: 'thead'})
  })

  itShouldBeAnHTMLElement(() => instance, 'thead')

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})