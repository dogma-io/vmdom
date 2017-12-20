import Element, {ELEMENT_EVENT_HANDLERS} from '../Element'

const TAG_NAME = 'html'

describe('Element', () => {
  let instance

  beforeEach(() => {
    instance = new Element({
      tagName: TAG_NAME,
    })
  })

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toImplementNode()
    expect(instance).toHaveEnumerables(ELEMENT_EVENT_HANDLERS)
  })

  it('should return passed in tagName for tagName property', () => {
    expect(instance.tagName).toBe(TAG_NAME)
  })

  it('should not allow tagName property to be overwritten', () => {
    expect(() => {
      instance.tagName = 'div'
    }).toThrowError(TypeError)
  })
})
