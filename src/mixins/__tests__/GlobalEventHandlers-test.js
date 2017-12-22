/**
 * @format
 */

import globalEventHandlersMixin from '../GlobalEventHandlers'
import {
  itShouldImplementGlobalEventHandlersInterface,
  PROPERTIES,
} from './GlobalEventHandlers.utils'

class Superclass {}
const GlobalEventHandlersClass = globalEventHandlersMixin(Superclass)

describe('GlobalEventHandlers', () => {
  let instance

  beforeEach(() => {
    instance = new GlobalEventHandlersClass()
  })

  itShouldImplementGlobalEventHandlersInterface(() => instance)

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(PROPERTIES)
  })
})
