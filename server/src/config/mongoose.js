const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('node-rest-starter:index')

const env = require('./environment')

Promise = require('bluebird')
mongoose.Promise = require('bluebird')

const mongoOption = {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

const mongoUri = env.mongo.host
mongoose.connect(mongoUri, mongoOption)
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})

if (env.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose
