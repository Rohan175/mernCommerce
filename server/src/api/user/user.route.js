const { Router } = require('express')
const validate = require('express-validation')
const guard = require('express-jwt')

const userParam = require('./user.param')
const userCtrl = require('./user.controller')
const env = require('../../config/environment')

const router = Router()


router.route('/')
  //.get(validate(userParam.list), userCtrl.list)
  .post(validate(userParam.create), userCtrl.create)
router.use(guard({ secret: env.jwtSecret, requestProperty: 'auth' }))
router.route('/:userId')
  .get(validate(userParam.get),userCtrl.get)
  .put(validate(userParam.update),
      userCtrl.update)
  .delete(validate(userParam.remove),
    userCtrl.remove)
router.param('userId', userCtrl.load)

module.exports = router
