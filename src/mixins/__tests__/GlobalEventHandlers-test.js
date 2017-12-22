/**
 * @format
 */

import globalEventHandlersMixin from '../GlobalEventHandlers'
import {
  itShoulImplementGlobalEventHandlersInterface,
  PROPERTIES,
} from './GlobalEventHandlers.utils'

class Superclass {}
const GlobalEventHandlersClass = globalEventHandlersMixin(Superclass)

describe('GlobalEventHandlers', () => {
  let instance

  beforeEach(() => {
    instance = new GlobalEventHandlersClass()
  })

  itShoulImplementGlobalEventHandlersInterface(() => instance)

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(PROPERTIES)
  })
})
