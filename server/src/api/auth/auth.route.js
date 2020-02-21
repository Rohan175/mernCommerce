const { Router } = require('express')
const validate = require('express-validation')
const authParam = require('./auth.param')
const authCtrl = require('./auth.controller')

const router = Router()

router.route('/login')
  .post(validate(authParam.login), authCtrl.login)

module.exports = router
