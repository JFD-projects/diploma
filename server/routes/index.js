const express = require('express');

const router = express.Router({mergeParams: true})

//api/auth
router.use('/auth', require('./auth.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/device', require('./device.routes'))
router.use('/category', require('./category.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/user', require('./user.routes'))
router.use('/order', require('./order.routes'))
router.use('/admin', require('./admin.routes'))

module.exports = router;