/**
 * @format
 * @flow
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
 */

import Node from './Node'
import NodeList from './NodeList'

export default class MutationRecord {
  addedNodes: NodeList
  attributeName: ?string
  attributeNamespace: ?string
  nextSibling: ?Node
  oldValue: ?string
  previousSibling: ?Node
  removedNodes: NodeList
  target: Node
  type: string
}
