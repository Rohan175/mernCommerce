const { Router } = require('express')
const validate = require('express-validation')
const guard = require('express-jwt')
const env = require('../../config/environment')

const productParam = require('./product.param')
const productCtrl = require('./product.controller')

const router = Router()

router.route('/')  
  .get(validate(productParam.list), productCtrl.list)
  .post(validate(productParam.create), productCtrl.create)

router.route('/:productId')
  .get(validate(productParam.get),productCtrl.get)
  .put(validate(productParam.update),productCtrl.update)
  .delete(validate(productParam.remove),productCtrl.remove)

router.param('productId', productCtrl.load)

module.exports = router
