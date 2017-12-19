import eventTargetMixin from '../EventTarget'

class Superclass {}
const EventTargetClass = eventTargetMixin(Superclass)

const ADD_EVENT_LISTENER_LISTENER_TYPE_ERROR =
  "TypeError: Failed to execute 'addEventListener' on 'EventTarget': The callback provided as parameter 2 is not a function."

describe('EventTarget', () => {
  let fnListener, instance, objListener

  beforeEach(() => {
    instance = new EventTargetClass()
    fnListener = jest.fn()
    objListener = {handleEvent: jest.fn()}
  })

  it('should not have any listeners on instantiation and has correct enumerables', () => {
    expect(instance._listeners).toEqual({})
    expect(instance).toHaveEnumerables([])
  })

  it('should not allow _listeners property to be overwritten', () => {
    expect(() => {
      instance._listeners = 'foobar'
    }).toThrowError(TypeError)
  })

  describe('addEventListener()', () => {
    it('should throw when listener is a boolean', () => {
      expect(() => {
        instance.addEventListener('click', true)
      }).toThrowError(ADD_EVENT_LISTENER_LISTENER_TYPE_ERROR)
    })

    it('should throw when listener is a number', () => {
      expect(() => {
        instance.addEventListener('click', 1)
      }).toThrowError(ADD_EVENT_LISTENER_LISTENER_TYPE_ERROR)
    })

    it('should throw when listener is a string', () => {
      expect(() => {
        instance.addEventListener('click', 'foobar')
      }).toThrowError(ADD_EVENT_LISTENER_LISTENER_TYPE_ERROR)
    })

    it('should throw when listener is a symbol', () => {
      expect(() => {
        instance.addEventListener('click', Symbol('foobar'))
      }).toThrowError(ADD_EVENT_LISTENER_LISTENER_TYPE_ERROR)
    })

    describe('when listener is a function', () => {
      describe('when even type is in listeners object', () => {
        beforeEach(() => {
          instance._listeners.click = []
        })

        describe('when listener is already in listeners object for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(fnListener)
          })

          it('should return undefined and not add listener to listeners object', () => {
            expect(instance.addEventListener('click', fnListener)).toBe(
              undefined,
            )
            expect(instance._listeners).toEqual({click: [fnListener]})
          })
        })

        describe('when listener is not in listeners object for event type', () => {
          it('should return undefined and add listener to listeners object', () => {
            expect(instance.addEventListener('click', fnListener)).toBe(
              undefined,
            )
            expect(instance._listeners).toEqual({click: [fnListener]})
          })
        })
      })

      describe('when event type is not in listeners object', () => {
        it('should return undefined and add listener to listeners object', () => {
          expect(instance.addEventListener('click', fnListener)).toBe(undefined)
          expect(instance._listeners).toEqual({click: [fnListener]})
        })
      })
    })

    describe('when listener is an object with handleEvent property', () => {
      describe('when even type is in listeners object', () => {
        beforeEach(() => {
          instance._listeners.click = []
        })

        describe('when listener is already in listeners object for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(objListener)
          })

          it('should return undefined and not add listener to listeners object', () => {
            expect(instance.addEventListener('click', objListener)).toBe(
              undefined,
            )
            expect(instance._listeners).toEqual({click: [objListener]})
          })
        })

        describe('when listener is not in listeners object for event type', () => {
          it('should return undefined and add listener to listeners object', () => {
            expect(instance.addEventListener('click', objListener)).toBe(
              undefined,
            )
            expect(instance._listeners).toEqual({click: [objListener]})
          })
        })
      })

      describe('when event type is not in listeners object', () => {
        it('should return undefined and add listener to listeners object', () => {
          expect(instance.addEventListener('click', objListener)).toBe(
            undefined,
          )
          expect(instance._listeners).toEqual({click: [objListener]})
        })
      })
    })
  })

  it('destroy() removes event listeners', () => {
    instance._listeners.click = [fnListener, objListener]
    EventTargetClass.destroy(instance)
    expect(instance._listeners.click).toHaveLength(0)
  })

  describe('dispatchEvent()', () => {
    let e

    beforeEach(() => {
      e = {type: 'click'}
    })

    describe('when event prevents default', () => {
      beforeEach(() => {
        e.defaultPrevented = true
      })

      describe('when event type is in listeners object', () => {
        beforeEach(() => {
          instance._listeners.click = []
        })

        describe('when function listener is present for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(fnListener)
          })

          it('returns false and calls listener with event', () => {
            expect(instance.dispatchEvent(e)).toBe(false)
            expect(fnListener).toHaveBeenCalledTimes(1)
            expect(fnListener).toHaveBeenCalledWith(e)
            expect(objListener.handleEvent).not.toHaveBeenCalled()
          })
        })

        describe('when object listener is present for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(objListener)
          })

          it('returns false and calls listener with event', () => {
            expect(instance.dispatchEvent(e)).toBe(false)
            expect(fnListener).not.toHaveBeenCalled()
            expect(objListener.handleEvent).toHaveBeenCalledTimes(1)
            expect(objListener.handleEvent).toHaveBeenCalledWith(e)
          })
        })

        describe('when listeners are not present for event type', () => {
          it('returns false', () => {
            expect(instance.dispatchEvent(e)).toBe(false)
          })
        })
      })

      describe('when event type is not in listeners object', () => {
        it('returns true', () => {
          expect(instance.dispatchEvent(e)).toBe(true)
        })
      })
    })

    describe('when event does not prevent default', () => {
      beforeEach(() => {
        e.defaultPrevented = false
      })

      describe('when event type is in listeners object', () => {
        beforeEach(() => {
          instance._listeners.click = []
        })

        describe('when function listener is present for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(fnListener)
          })

          it('returns true and calls listener with event', () => {
            expect(instance.dispatchEvent(e)).toBe(true)
            expect(fnListener).toHaveBeenCalledTimes(1)
            expect(fnListener).toHaveBeenCalledWith(e)
            expect(objListener.handleEvent).not.toHaveBeenCalled()
          })
        })

        describe('when object listener is present for event type', () => {
          beforeEach(() => {
            instance._listeners.click.push(objListener)
          })

          it('returns true and calls listener with event', () => {
            expect(instance.dispatchEvent(e)).toBe(true)
            expect(fnListener).not.toHaveBeenCalled()
            expect(objListener.handleEvent).toHaveBeenCalledTimes(1)
            expect(objListener.handleEvent).toHaveBeenCalledWith(e)
          })
        })

        describe('when listeners are not present for event type', () => {
          it('returns true', () => {
            expect(instance.dispatchEvent(e)).toBe(true)
          })
        })
      })

      describe('when event type is not in listeners object', () => {
        it('returns true', () => {
          expect(instance.dispatchEvent(e)).toBe(true)
        })
      })
    })
  })

  describe('removeEventListener()', () => {
    describe('when event type is in listeners object', () => {
      beforeEach(() => {
        instance._listeners.click = []
      })

      describe('when listener is listening to event', () => {
        beforeEach(() => {
          instance._listeners.click.push(fnListener)
        })

        it('should return undefined and stop listening', () => {
          expect(instance.removeEventListener('click', fnListener)).toBe(
            undefined,
          )
          expect(instance._listeners).toEqual({click: []})
        })
      })

      describe('when listener is not listening to event', () => {
        it('should return undefined', () => {
          expect(instance.removeEventListener('click', fnListener)).toBe(
            undefined,
          )
        })
      })
    })

    describe('when event type is not in listeners object', () => {
      it('should return undefined', () => {
        expect(instance.removeEventListener('click', fnListener)).toBe(
          undefined,
        )
      })
    })
  })
})
