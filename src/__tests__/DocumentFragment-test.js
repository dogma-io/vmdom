/**
 * @format
 */

import DocumentFragment from '../DocumentFragment'
import {itShouldImplementNodeInterface} from './Node.utils'

describe('DocumentFragment', () => {
  let instance

  beforeEach(() => {
    instance = new DocumentFragment()
  })

  itShouldImplementNodeInterface(() => instance)
})
