const Joi = require('joi')

module.exports = {
  create: {
    body: {
      productname: Joi.string().required(),
      productImage: Joi.string().required(),
      price: Joi.string().required()
    }
  },

  get: {
    headers: {
      authorization: Joi.string().required()
    },
  },

  update: {
    headers: {
      authorization: Joi.string().required()
    },
    body: {
      productname: Joi.string().required()
    }
  },

  list: {

    query: {
      skip: Joi.string(),
      limit: Joi.string()
    }
  },

  remove: {
    headers: {
      authorization: Joi.string().required()
    },
  }
}
