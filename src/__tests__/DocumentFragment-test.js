/**
 * @format
 */

import DocumentFragment from '../DocumentFragment'
import {itShouldImplementNodeInterface} from '../mixins/__tests__/Node.utils'

describe('DocumentFragment', () => {
  let instance

  beforeEach(() => {
    instance = new DocumentFragment()
  })

  itShouldImplementNodeInterface(() => instance)
})
