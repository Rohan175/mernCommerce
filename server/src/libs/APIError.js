function APIError (message, status = 500, isPublic = false) {
  const instance = new Error(message)
  instance.status = status
  instance.isPublic = isPublic
  instance.isOperational = true
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))
  Error.stackTraceLimit = 10
  Error.captureStackTrace(instance, APIError)
  return instance
}

APIError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

Object.setPrototypeOf(APIError, Error)

module.exports = APIError
