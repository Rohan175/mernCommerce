const Joi = require('joi')

module.exports = {
  login: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
}
