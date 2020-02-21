const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const JWToken = require('../../libs/jwToken')
const APIError = require('../../libs/APIError')
const User = require('../user/user.model')

async function login (req, res, next) {
  try {
    const user = await User.get({ username: req.body.username })
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        _id: user._id,
        username: user.username
      }
      const token = JWToken.create(payload, '20m')
      return res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          mobileNumber: user.mobileNumber
        }
      })
    }
    throw new APIError('Authentication error!', httpStatus.UNAUTHORIZED, true)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  login
}
