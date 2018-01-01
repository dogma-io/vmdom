import Node from '../Node'
import {itShouldImplementNodeInterface} from './Node.utils'

describe('Node', () => {
  let instance

  beforeEach(() => {
    instance = new Node()
  })

  itShouldImplementNodeInterface(() => instance)

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables([])
  })
})
