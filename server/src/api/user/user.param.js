const Joi = require('joi')

module.exports = {
  
  create: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  get: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      userId: Joi.string().required()
    }
  },

  update: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      userId: Joi.string().required()
    },
    body: {
      mobileNumber: Joi.string().required()
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
    params: {
      userId: Joi.string().required()
    }
  }
}
