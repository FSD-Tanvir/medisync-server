const express = require('express')
const router = express.Router()
const sslCommerzController= require('../controllers/sslCommerzController')

// get all orders user specific
router.get('/:userEmail',sslCommerzController.getAllOrders)
router.get('/all',sslCommerzController.AllOrders)
// post route
router.post('/',sslCommerzController.postPayment)
router.post('/payment/success/:tranId',sslCommerzController.updateOrder)
router.post('/payment/failed/:tranId',sslCommerzController.deleteOrder)
router.post('/payment/cancel/:tranId',sslCommerzController.deleteOrder)

module.exports = router ;