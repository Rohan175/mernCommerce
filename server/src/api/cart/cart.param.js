const Joi = require('joi')

const itemsParams =  Joi.object().keys({  
  productId: Joi.string().required(),
  qty: Joi.array().required(),
  price: Joi.string().required(),
  name: Joi.string().required()
})

const bodyProductId = {  productId: Joi.string().required()}
module.exports = {
  updateArray: {
    body: {
      items: Joi.array().min(1).items(itemsParams).required(),
    }
  },
  update: {body:{itemsParams}},
}

