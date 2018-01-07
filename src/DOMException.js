/**
 * @flow
 * @format
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMException
 */

const LEGACY_ERROR_NAMES_TO_CODES = {
  AbortError: 20,
  DataCloneError: 25,
  DOMStringSizeError: 2,
  HierarchyRequestError: 3,
  IndexSizeError: 1,
  InUseAttributeError: 10,
  InvalidAccessError: 15,
  InvalidCharacterError: 5,
  InvalidNodeTypeError: 24,
  InvalidModificationError: 13,
  InvalidStateError: 11,
  NamespaceError: 14,
  NetworkError: 19,
  NoDataAllowedError: 6,
  NoModificationAllowedError: 7,
  NotFoundError: 8,
  NotSupportedError: 9,
  QuotaExceededError: 22,
  SecurityError: 18,
  SyntaxError: 12,
  TimeoutError: 23,
  TypeMismatchError: 17,
  URLMismatchError: 21,
  ValidationError: 16,
  WrongDocumentError: 4,
}

export default class DOMException extends Error {
  code: number
  message: string
  name: string

  constructor(message?: string, name?: string) {
    super(message)

    message = `DOMException: ${message || ''}`

    // $FlowFixMe - Flow seems to hate getters/setters over value property
    Object.defineProperties(this, {
      code: {
        enumerable: false,

        get(): number {
          return name ? LEGACY_ERROR_NAMES_TO_CODES[name] || 0 : 0
        },

        set(newValue: *): * {
          return newValue
        },
      },
      message: {
        enumerable: false,

        get(): string | void {
          return message
        },

        set(newValue: *): * {
          return newValue
        },
      },
      name: {
        enumerable: false,

        get(): string {
          return name || 'Error'
        },

        set(newValue: *): * {
          return newValue
        },
      },
    })

    Error.captureStackTrace(this, this.constructor)
  }
}
