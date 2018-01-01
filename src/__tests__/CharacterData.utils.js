export function toBeCharacterData(getInstance, data) {
  describe('CharacterData interface', () => {
    let instance

    beforeEach(() => {
      instance = getInstance()
    })

    it('should have correct data and length', () => {
      expect(instance.data).toBe(data)
      expect(instance.length).toBe(data.length)
    })

    it('should not allow data to be overwritten', () => {
      expect((instance.data = `${data}blah`)).toBe(`${data}blah`)
      expect(instance.data).toBe(data)
    })

    it('should not allow length to be overwritten', () => {
      expect((instance.length = data.length + 1)).toBe(data.length + 1)
      expect(instance.length).toBe(data.length)
    })

    describe('appendData()', () => {
      it('should append boolean data', () => {
        const newValue = `${data}true`
        instance.appendData(true)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should append null data', () => {
        const newValue = `${data}null`
        instance.appendData(null)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should append numeric data', () => {
        const newValue = `${data}1`
        instance.appendData(1)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should append string data', () => {
        const newValue = `${data}bar`
        instance.appendData('bar')
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should throw when appending symbol', () => {
        expect(() => {
          instance.appendData(Symbol('bar'))
        }).toThrow(TypeError)
      })

      it('should append undefined data', () => {
        const newValue = `${data}undefined`
        instance.appendData(undefined)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })
    })

    it('deleteData() should delete data', () => {
      const newValue = data.substr(0, 1) + data.substr(2)
      instance.deleteData(1, 2)
      expect(instance.data).toBe(newValue)
      expect(instance.length).toBe(newValue.length)
    })

    describe('insertData()', () => {
      it('should insert boolean data', () => {
        const newValue = `${data.substr(0, 1)}true${data.substr(1)}`
        instance.insertData(1, true)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should insert null data', () => {
        const newValue = `${data.substr(0, 1)}null${data.substr(1)}`
        instance.insertData(1, null)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should insert numeric data', () => {
        const newValue = `${data.substr(0, 1)}1${data.substr(1)}`
        instance.insertData(1, 1)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should insert string data', () => {
        const newValue = `${data.substr(0, 1)}bar${data.substr(1)}`
        instance.insertData(1, 'bar')
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should throw when inserting symbol', () => {
        expect(() => {
          instance.insertData(1, Symbol('bar'))
        }).toThrow(TypeError)
      })

      it('should insert undefined data', () => {
        const newValue = `${data.substr(0, 1)}undefined${data.substr(1)}`
        instance.insertData(1, undefined)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })
    })

    describe('replaceData()', () => {
      it('should replace data with boolean', () => {
        const newValue = `${data.substr(0, 1)}true${data.substr(2)}`
        instance.replaceData(1, 2, true)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should replace data with null', () => {
        const newValue = `${data.substr(0, 1)}null${data.substr(2)}`
        instance.replaceData(1, 2, null)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should replace data with number', () => {
        const newValue = `${data.substr(0, 1)}1${data.substr(2)}`
        instance.replaceData(1, 2, 1)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should replace data with string', () => {
        const newValue = `${data.substr(0, 1)}bar${data.substr(2)}`
        instance.replaceData(1, 2, 'bar')
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })

      it('should throw when replacing data with symbol', () => {
        expect(() => {
          instance.replaceData(1, 2, Symbol('bar'))
        }).toThrow(TypeError)
      })

      it('should replace data with undefined', () => {
        const newValue = `${data.substr(0, 1)}undefined${data.substr(2)}`
        instance.replaceData(1, 2, undefined)
        expect(instance.data).toBe(newValue)
        expect(instance.length).toBe(newValue.length)
      })
    })

    it('substringData() should return substring', () => {
      expect(instance.substringData(0, 1)).toBe(data.substr(0, 1))
    })
  })
}
