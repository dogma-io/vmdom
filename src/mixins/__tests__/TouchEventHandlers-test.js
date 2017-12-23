/**
 * @format
 */

import touchEventHandlersMixin from '../TouchEventHandlers'
import {
  itShouldImplementTouchEventHandlersInterface,
  PROPERTIES,
} from './TouchEventHandlers.utils'

class Superclass {}
const TouchEventHandlersClass = touchEventHandlersMixin(Superclass)

describe('TouchEventHandlers', () => {
  let instance

  beforeEach(() => {
    instance = new TouchEventHandlersClass()
  })

  itShouldImplementTouchEventHandlersInterface(() => instance)

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(PROPERTIES)
  })
})
