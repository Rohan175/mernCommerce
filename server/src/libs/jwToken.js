const jwt = require('jsonwebtoken')
const env = require('../config/environment')

const create = (payload, expiresIn) => jwt.sign(payload,
  env.jwtSecret, { expiresIn })

const getData = (token) => jwt.decode(token)

module.exports = {
  create,
  getData
}
