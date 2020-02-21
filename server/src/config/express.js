const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const methodOverride = require('method-override')
const validation = require('express-validation')
const httpStatus = require('http-status')
const logger = require('@skarif2/logger')

const env = require('./environment')
const routes = require('../route')
const APIError = require('../libs/APIError')

const app = express()

app.set('port', env.port)
app.use(compression())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (env.nodeEnv !== 'test') {
  app.use(logger())
}

app.use(methodOverride())
app.use(cors())
app.use(helmet())

app.use('/api', routes)
app.use((err, req, res, next) => {
  if (err instanceof validation.ValidationError) {
    // ValidationError is an array of error
    const messages = err.errors.map(error => error.messages.join('. ')).join(' and ')
    const error = new APIError(messages, err.status, true)
    return next(error)
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

app.use((req, res, next) => {
  const err = new APIError('API not found!', httpStatus.NOT_FOUND, false)
  return next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: env.nodeEnv === 'dev' ? err.stack : {}
  })
})

module.exports = app
