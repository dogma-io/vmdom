/**
 * @format
 */

import nodeMixin from '../Node'
import {itShouldImplementNodeInterface} from './Node.utils'

class Superclass {}
const NodeClass = nodeMixin(Superclass)

describe('EventTarget', () => {
  let instance

  beforeEach(() => {
    instance = new NodeClass()
  })

  itShouldImplementNodeInterface(() => instance)

  it('should have correct enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })
})
