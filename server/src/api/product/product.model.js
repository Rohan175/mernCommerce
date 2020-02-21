const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
  },
  productImage: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
},
{ timestamps: true })

ProductSchema.statics = {
  
  async get (conditions) {
    const Product = await this.findOne(conditions).exec()
    if (Product) {
      return Product
    }
    const err = new APIError('No such Product exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  async list ({ skip = 0, limit = 50 } = {}) {
    const Products = await this.find()
      //.select('-createdAt -__v -updatedAt')
      .sort({ updatedAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
    return Products
  }
}

module.exports = mongoose.model('Product', ProductSchema)
