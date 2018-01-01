import {ELEMENT_EVENT_HANDLERS} from '../Element'
import {HTML_ELEMENT_EVENT_HANDLERS} from '../HTMLElement'
import HTMLTableDataCellElement from '../HTMLTableDataCellElement'
import HTMLTableRowElement from '../HTMLTableRowElement'
import {GLOBAL_EVENT_HANDLERS} from '../mixins/GlobalEventHandlers'
import {TOUCH_EVENT_HANDLERS} from '../mixins/TouchEventHandlers'
import {itShouldBeAnHTMLElement} from './HTMLElement.utils'

describe('HTMLTableRowElement', () => {
  let instance

  beforeEach(() => {
    instance = new HTMLTableRowElement()
  })

  itShouldBeAnHTMLElement(() => instance, 'tr')

  it('should have expected enumerables', () => {
    expect(instance).toHaveEnumerables(
      HTML_ELEMENT_EVENT_HANDLERS.concat(ELEMENT_EVENT_HANDLERS)
        .concat(GLOBAL_EVENT_HANDLERS)
        .concat(TOUCH_EVENT_HANDLERS),
    )
  })

  it('should not allow _cells to be overwritten', () => {
    expect(() => {
      instance._cells = ['test']
    }).toThrow(TypeError)
  })

  it('should not allow cells to be overwritten', () => {
    expect(() => {
      instance.cells = ['test']
    }).toThrow(TypeError)
  })

  describe('deleteCell()', () => {
    describe('when no cells present', () => {
      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteCell()
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteCell(-2)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is cell length since indices are zero based', () => {
        expect(() => {
          instance.deleteCell(0)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 0 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.deleteCell(1)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 1 is outside the range \[-1, -1]\./,
        )
      })

      it('should throw when index is not a number', () => {
        expect(() => {
          instance.deleteCell(NaN)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index -1 is outside the range \[-1, -1]\./,
        )
      })
    })

    describe('when one cell present', () => {
      beforeEach(() => {
        instance.insertCell()
      })

      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteCell()
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteCell(-2)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is cell length since indices are zero based', () => {
        expect(() => {
          instance.deleteCell(1)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 1 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.deleteCell(2)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 2 is outside the range \[-1, 0]\./,
        )
      })

      it('should delete cell when index is 0', () => {
        instance.deleteCell(0)
        expect(instance.cells).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })

      it('should delete cell when index is -1', () => {
        instance.deleteCell(-1)
        expect(instance.cells).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })

      it('should delete cell when index is not a number', () => {
        instance.deleteCell(NaN)
        expect(instance.cells).toHaveLength(0)
        expect(instance.childNodes).toHaveLength(0)
      })
    })

    describe('when multiple cells present', () => {
      let firstCell, lastCell

      beforeEach(() => {
        instance.insertCell()
        instance.insertCell()
        firstCell = instance.cells[0]
        lastCell = instance.cells[1]
      })

      it('should throw when position argument missing', () => {
        expect(() => {
          instance.deleteCell()
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': 1 argument required, but only 0 present\./,
        )
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.deleteCell(-2)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is cell length since indices are zero based', () => {
        expect(() => {
          instance.deleteCell(2)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.deleteCell(3)
        }).toThrow(
          /Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index 3 is outside the range \[-1, 1]\./,
        )
      })

      it('should delete first cell when index is 0', () => {
        instance.deleteCell(0)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(lastCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(lastCell)
      })

      it('should delete last cell when index is 1', () => {
        instance.deleteCell(1)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstCell)
      })

      it('should delete last cell when index is -1', () => {
        instance.deleteCell(-1)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstCell)
      })

      it('should delete last cell when index is not a number', () => {
        instance.deleteCell(NaN)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(firstCell)
      })
    })
  })

  describe('insertCell()', () => {
    describe('when no cells present', () => {
      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertCell(-2)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.insertCell(1)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index 1 is outside the range \[-1, 0]\./,
        )
      })

      it('should insert cell when index is -1', () => {
        const newCell = instance.insertCell(-1)
        expect(newCell).toBeInstanceOf(HTMLTableDataCellElement)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newCell)
      })

      it('should insert cell when index is 0', () => {
        const newCell = instance.insertCell(0)
        expect(newCell).toBeInstanceOf(HTMLTableDataCellElement)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newCell)
      })

      it('should insert cell when index is omitted', () => {
        const newCell = instance.insertCell()
        expect(newCell).toBeInstanceOf(HTMLTableDataCellElement)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newCell)
      })

      it('should insert cell when index is not a number', () => {
        const newCell = instance.insertCell(NaN)
        expect(newCell).toBeInstanceOf(HTMLTableDataCellElement)
        expect(instance.cells).toHaveLength(1)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(1)
        expect(instance.childNodes[0]).toBe(newCell)
      })
    })

    describe('when one cell present', () => {
      let firstCell

      beforeEach(() => {
        firstCell = instance.insertCell()
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertCell(-2)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, 0]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.insertCell(2)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index 2 is outside the range \[-1, 0]\./,
        )
      })

      it('should insert cell when index is -1', () => {
        const newCell = instance.insertCell(-1)
        expect(instance.cells).toHaveLength(2)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(newCell)
      })

      it('should insert cell when index is 0', () => {
        const newCell = instance.insertCell(0)
        expect(instance.cells).toHaveLength(2)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.cells[1]).toBe(firstCell)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(newCell)
        expect(instance.childNodes[1]).toBe(firstCell)
      })

      it('should insert cell when index is 1', () => {
        const newCell = instance.insertCell(1)
        expect(instance.cells).toHaveLength(2)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(newCell)
      })

      it('should insert cell when index is omitted', () => {
        const newCell = instance.insertCell()
        expect(instance.cells).toHaveLength(2)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(newCell)
      })

      it('should insert cell when index is not a number', () => {
        const newCell = instance.insertCell(NaN)
        expect(newCell).toBeInstanceOf(HTMLTableDataCellElement)
        expect(instance.cells).toHaveLength(2)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(2)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(newCell)
      })
    })

    describe('when multiple cells present', () => {
      let firstCell, secondCell

      beforeEach(() => {
        firstCell = instance.insertCell()
        secondCell = instance.insertCell()
      })

      it('should throw when index is less than -1', () => {
        expect(() => {
          instance.insertCell(-2)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index -2 is outside the range \[-1, 1]\./,
        )
      })

      it('should throw when index is greater than cell length', () => {
        expect(() => {
          instance.insertCell(3)
        }).toThrow(
          /Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index 3 is outside the range \[-1, 1]\./,
        )
      })

      it('should insert cell when index is -1', () => {
        const newCell = instance.insertCell(-1)
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(secondCell)
        expect(instance.cells[2]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(secondCell)
        expect(instance.childNodes[2]).toBe(newCell)
      })

      it('should insert cell when index is 0', () => {
        const newCell = instance.insertCell(0)
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(newCell)
        expect(instance.cells[1]).toBe(firstCell)
        expect(instance.cells[2]).toBe(secondCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(newCell)
        expect(instance.childNodes[1]).toBe(firstCell)
        expect(instance.childNodes[2]).toBe(secondCell)
      })

      it('should insert cell when index is 1', () => {
        const newCell = instance.insertCell(1)
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(newCell)
        expect(instance.cells[2]).toBe(secondCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(newCell)
        expect(instance.childNodes[2]).toBe(secondCell)
      })

      it('should insert cell when index is 2', () => {
        const newCell = instance.insertCell(2)
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(secondCell)
        expect(instance.cells[2]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(secondCell)
        expect(instance.childNodes[2]).toBe(newCell)
      })

      it('should insert cell when index is omitted', () => {
        const newCell = instance.insertCell()
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(secondCell)
        expect(instance.cells[2]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(secondCell)
        expect(instance.childNodes[2]).toBe(newCell)
      })

      it('should insert cell when index is not a number', () => {
        const newCell = instance.insertCell(NaN)
        expect(instance.cells).toHaveLength(3)
        expect(instance.cells[0]).toBe(firstCell)
        expect(instance.cells[1]).toBe(secondCell)
        expect(instance.cells[2]).toBe(newCell)
        expect(instance.childNodes).toHaveLength(3)
        expect(instance.childNodes[0]).toBe(firstCell)
        expect(instance.childNodes[1]).toBe(secondCell)
        expect(instance.childNodes[2]).toBe(newCell)
      })
    })
  })
})
