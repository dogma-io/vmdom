import Element, {ELEMENT_EVENT_HANDLERS} from '../Element'
import {itShouldBeAnElement} from './Element.utils'

const TAG_NAME = 'html'

describe('Element', () => {
  let instance

  beforeEach(() => {
    instance = new Element({
      tagName: TAG_NAME,
    })
  })

  itShouldBeAnElement(() => instance, TAG_NAME)

  it('should hae correct enumerables', () => {
    expect(instance).toHaveEnumerables(ELEMENT_EVENT_HANDLERS)
  })
})
