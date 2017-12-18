import Document from '../Document'

describe('Document', () => {
  let instance

  beforeEach(() => {
    instance = new Document()
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementNode()
    expect(instance).toHaveEnumerables([])
  })
})
