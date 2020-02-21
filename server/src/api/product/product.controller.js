const _ = require('lodash')
const httpStatus = require('http-status')

const ProductSchema = require('./product.model')
const APIError = require('../../libs/APIError')

async function load (req, res, next, id) {
  try {
    req.Product = await ProductSchema.get({ '_id': id })
    return next()
  } catch (e) {
    next(e)
  }
}

function get (req, res, next) {
  const Product = req.Product
  const sendProduct = _.pick(Product, ['_id', 'productname', 'productImage','productDescription','price'])  
  return res.json(sendProduct)
}

async function create (req, res, next) {
  try {
    const Product = new ProductSchema({
      productname: req.body.productname,
      productImage: req.body.productImage,
      productDescription: req.body.productDescription,
      price: req.body.price,
    })
    
    const savedProduct = await Product.save()
    return res.json(savedProduct)
  } catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    return next(err)
  }
}

async function update (req, res, next) {
  try {
    const Product = req.Product
    Product.productname = req.body.productname
    const savedProduct = await Product.save()
    return res.json(savedProduct)
  } catch (e) {
    next(e)
  }
}

async function list (req, res, next) {
  try {
    const Products = await ProductSchema.list(req.query)
    return res.json({data : Products})
  } catch (e) {
    next(e)
  }
}

async function remove (req, res, next) {
  try {
    const Product = req.Product
    const deletedProduct = await Product.remove()
    return res.json(deletedProduct)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  load,
  get,
  create,
  list,
  update,
  remove
}
