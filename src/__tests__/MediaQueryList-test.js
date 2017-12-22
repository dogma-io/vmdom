import MediaQueryList, {
  MEDIA_QUERY_LIST_EVENT_HANDLERS,
} from '../MediaQueryList'
import {itShouldImplementEventTargetInterface} from '../mixins/__tests__/EventTarget.utils'

const MEDIA = 'foo'

describe('MediaQueryList', () => {
  let instance

  beforeEach(() => {
    instance = new MediaQueryList(MEDIA)
  })

  itShouldImplementEventTargetInterface(() => instance)

  it('should implement expected interfaces and has correct enumerables', () => {
    expect(instance).toImplementEventTarget()
    expect(instance).toHaveEnumerables(MEDIA_QUERY_LIST_EVENT_HANDLERS)
  })

  it('should return false for matches property', () => {
    expect(instance.matches).toBe(false)
  })

  it('should not allow matches property to be overwritten', () => {
    expect(() => {
      instance.matches = true
    }).toThrowError(TypeError)
  })

  it('should return passed in media for media property', () => {
    expect(instance.media).toBe(MEDIA)
  })

  it('should not allow media property to be overwritten', () => {
    expect(() => {
      instance.media = 'bar'
    }).toThrowError(TypeError)
  })
})
