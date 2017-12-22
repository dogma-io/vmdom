/**
 * @format
 */

import eventTargetMixin from '../EventTarget'
import {itShouldImplementEventTargetInterface} from './EventTarget.utils'

class Superclass {}
const EventTargetClass = eventTargetMixin(Superclass)

describe('EventTarget', () => {
  let instance

  beforeEach(() => {
    instance = new EventTargetClass()
  })

  itShouldImplementEventTargetInterface(() => instance)

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })
})
