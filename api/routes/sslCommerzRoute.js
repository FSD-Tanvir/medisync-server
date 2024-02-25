const express = require('express')
const router = express.Router()
const sslCommerzController= require('../controllers/sslCommerzController')

// post route
router.post('/order',sslCommerzController.postPaymet)
router.post('/payment/success/:tranId',sslCommerzController.tranId)

module.exports = router ;