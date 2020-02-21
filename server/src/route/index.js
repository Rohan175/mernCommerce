const express = require('express')

const guard = require('express-jwt')
const env = require('../config/environment')

const userRoutes = require('../api/user/user.route')
const authRoutes = require('../api/auth/auth.route')
const productRoutes = require('../api/product/product.route')
const cartRoutes = require('../api/cart/cart.route')

const router = express.Router()

router.get('/', (req, res) => res.send('OK'))
router.use('/users', userRoutes)
router.use('/auth', authRoutes)

router.use(guard({ secret: env.jwtSecret, requestProperty: 'auth' }))
router.use('/products',productRoutes)
router.use('/cart',cartRoutes)

module.exports = router
