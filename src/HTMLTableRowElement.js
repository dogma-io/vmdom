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

type Cells = Array<HTMLTableCellElement>

function deleteCell(cells: Cells, position: number) {
  if (position === undefined) {
    throw new TypeError(
      "Failed to execute 'deleteCell' on 'HTMLTableRowElement': 1 argument required, but only 0 present.",
    )
  }

  const index = isNaN(position) ? -1 : parseInt(position)
  const max = cells.length - 1

  if (index < -1 || index > max || cells.length === 0) {
    throw new DOMException(
      `Failed to execute 'deleteCell' on 'HTMLTableRowElement': The provided index ${index} is outside the range [-1, ${max}].`,
    )
  }

  cells.splice(index, 1).forEach((node: HTMLTableCellElement) => {
    this.removeChild(node)
  })
}

function insertCell(cells: Cells, position?: number): HTMLTableDataCellElement {
  const index = isNaN(position) ? -1 : parseInt(position)

  if (index < -1 || index > Math.max(0, cells.length)) {
    throw new DOMException(
      `Failed to execute 'insertCell' on 'HTMLTableRowElement': The provided index ${index} is outside the range [-1, ${Math.max(
        0,
        cells.length - 1,
      )}].`,
    )
  }

  const newCell = new HTMLTableDataCellElement()
  const nextCell = cells[index]

  if (index === -1) {
    cells.push(newCell)
  } else {
    cells.splice(index, 0, newCell)
  }

  if (nextCell) {
    this.insertBefore(newCell, nextCell)
  } else {
    this.appendChild(newCell)
  }

  return newCell
}

export default class HTMLTableRowElement extends HTMLElement {
  deleteCell: (position: number) => void
  insertCell: (position?: number) => HTMLTableDataCellElement
  cells: HTMLCollection

  constructor() {
    super({tagName: 'tr'})

    const cells: Cells = []

    Object.defineProperties(this, {
      cells: {
        enumerable: false,
        value: new HTMLCollection(cells),
        writable: false,
      },
      deleteCell: {
        enumerable: false,
        value: deleteCell.bind(this, cells),
        writable: false,
      },
      insertCell: {
        enumerable: false,
        value: insertCell.bind(this, cells),
        writable: false,
      },
      // TODO: implement property rowIndex
      // TODO: implement property sectionRowIndex
    })
  }
}
