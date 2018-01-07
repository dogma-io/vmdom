/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
 */

import DOMException from './DOMException'
import HTMLCollection from './HTMLCollection'
import HTMLElement from './HTMLElement'
import HTMLTableCellElement from './HTMLTableCellElement'
import HTMLTableDataCellElement from './HTMLTableDataCellElement'

export default class HTMLTableRowElement extends HTMLElement {
  _cells: Array<HTMLTableCellElement>
  cells: HTMLCollection

  constructor() {
    super({tagName: 'tr'})

    const cells: Array<HTMLTableCellElement> = []

    Object.defineProperties(this, {
      _cells: {
        enumerable: false,
        value: cells,
        writable: false,
      },
      cells: {
        enumerable: false,
        value: new HTMLCollection(cells),
        writable: false,
      },
    })

    // TODO: implement property rowIndex
    // TODO: implement property sectionRowIndex
  }

  deleteCell(position: number) {
    if (position === undefined) {
      throw new TypeError(
        "Failed to execute 'deleteCell' on 'HTMLTableRowElement': 1 argument required, but only 0 present.",
      )
    }

    const index = isNaN(position) ? -1 : parseInt(position)
    const max = this._cells.length - 1

    if (index < -1 || index > max || this._cells.length === 0) {
      throw new DOMException(
        `Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index ${index} is outside the range [-1, ${max}].`,
      )
    }

    this._cells.splice(index, 1).forEach((node: HTMLTableCellElement) => {
      this.removeChild(node)
    })
  }

  insertCell(position?: number): HTMLTableDataCellElement {
    const index = isNaN(position) ? -1 : parseInt(position)

    if (index < -1 || index > Math.max(0, this._cells.length)) {
      throw new DOMException(
        `Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index ${index} is outside the range [-1, ${Math.max(
          0,
          this._cells.length - 1,
        )}].`,
      )
    }

    const newCell = new HTMLTableDataCellElement()
    const nextCell = this._cells[index]

    if (index === -1) {
      this._cells.push(newCell)
    } else {
      this._cells.splice(index, 0, newCell)
    }

    if (nextCell) {
      this.insertBefore(newCell, nextCell)
    } else {
      this.appendChild(newCell)
    }

    return newCell
  }
}
