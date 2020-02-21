const _ = require('lodash')
const httpStatus = require('http-status')
const jwt = require("../../libs/jwToken")

const CartSchema = require('./cart.model')
const APIError = require('../../libs/APIError')

async function load (req, res, next) {
  try {
    req.cart = await CartSchema.get(req.auth._id)
    next()
  } catch (e) {
    next(e)
  }
}

async function add(req, res, next) {
  try{
    const { productId,price,name} = req.body;
    const qty = Number.parseInt(req.body.qty);
    let cart = req.cart
    if (qty <= 0) {
      next(new APIError('Invalid request'));
    }else if (cart) {
      const indexFound = cart.items.findIndex(item => {
        return item._id == productId;
      });

      if (indexFound !== -1) {
        //cart.items.splice(indexFound, 1);    
        cart.items[indexFound].qty = cart.items[indexFound].qty + qty;
      } else {
        cart.items.push({_id:productId,qty,price,name});
      }
    } else {
      cart = new CartSchema({
        _id : req.auth._id,
        items: [{_id:productId,qty,price,name}],
      });
    }
    console.log(req.auth._id)
    const savedCart= await cart.save();
    return res.json(savedCart)
  } catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    next(err)
  }
}

async function sub(req, res, next) {
  try{
  const { productId} = req.body;
  const qty = Number.parseInt(req.body.qty);
  const cart = req.cart
  if (!cart || qty <= 0) {
    next(new APIError('Invalid request'));
  }else { 
    const indexFound = cart.items.findIndex(item => {
      return item._id == productId;
    });
    if (indexFound !== -1) {
      let updatedQty = cart.items[indexFound].qty - qty;
        if (updatedQty <= 0) {
          cart.items.splice(indexFound, 1);
        } else {
          cart.items[indexFound].qty = updatedQty;
        }
        const updatedCart = cart.save()
        return res.json(updatedCart)
    }else{
      next(new APIError('Cart Item not found'));
    }
  }
} catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    next(err)
  }
}

async function list (req, res, next) {
  try {
    if(req.cart){
      // console.warn(req.cart.items)
      //console.warn(req.cart.productInfo)
      return res.json({data:req.cart.items})
    }
    next(new APIError('No such cart exists!', httpStatus.NOT_FOUND))
  } catch (e) {
    next(e)
  }
}

module.exports = {
  load,
  list,
  add,
  sub
}
