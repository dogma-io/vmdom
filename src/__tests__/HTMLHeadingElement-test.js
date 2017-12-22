import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLHeadingElement from '../HTMLHeadingElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLHeadingElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLHeadingElement({tagName: 'h1'})
  })

  itShouldBeAnHTMLElement(() => instance, 'h1')

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })
})