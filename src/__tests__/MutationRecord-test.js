import MutationRecord from '../MutationRecord'

describe('MutationRecord', () => {
  let instance

  beforeEach(() => {
    instance = new MutationRecord()
  })

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables([
      'addedNodes',
      'attributeName',
      'attributeNamespace',
      'nextSibling',
      'oldValue',
      'previousSibling',
      'removedNodes',
      'target',
      'type',
    ])
  })
})
