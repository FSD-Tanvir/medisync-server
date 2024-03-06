const express = require('express')
const router = express.Router()
const sslCommerzController= require('../controllers/sslCommerzController')

// post route
router.post('/',sslCommerzController.postPayment)
router.post('/payment/success/:tranId',sslCommerzController.updateOrder)
router.post('/payment/failed/:tranId',sslCommerzController.deleteOrder)
router.post('/payment/cancel/:tranId',sslCommerzController.deleteOrder)

module.exports = router ;