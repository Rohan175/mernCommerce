const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
UserSchema.statics = {

  async get (conditions) {
    const user = await this.findOne(conditions).exec()
    if (user) {
      return user
    }
    const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  async list ({ skip = 0, limit = 50 } = {}) {
    const users = await this.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
    return users
  }
}

module.exports = mongoose.model('User', UserSchema)
