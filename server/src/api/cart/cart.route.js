const { Router } = require('express')
const validate = require('express-validation')

const Param = require('./cart.param')
const Ctrl = require('./cart.controller')

const router = Router()

router.use(Ctrl.load)
router.route('/').get(Ctrl.list)
router.use(validate(Param.update))
router.route('/add').post(Ctrl.add)
router.route('/sub').post(Ctrl.sub)

module.exports = router
