/**
 * @format
 */

jest.mock('node-fetch')

import windowOrWorkerGlobalScopeMixin from '../WindowOrWorkerGlobalScope'
import {itShouldImplementWindowOrWorkerGlobalScopeInterface} from './WindowOrWorkerGlobalScope.utils'

class Superclass {}

const WindowOrWorkerGlobalScopeClass = windowOrWorkerGlobalScopeMixin(
  Superclass,
)

describe('WindowOrWorkerGlobalScope', () => {
  let instance

  beforeEach(() => {
    instance = new WindowOrWorkerGlobalScopeClass()
  })

  itShouldImplementWindowOrWorkerGlobalScopeInterface(() => instance)

  it('should have expected emuerables', () => {
    expect(instance).toHaveEnumerables([])
  })
})
