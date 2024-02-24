const SSLCommerzModel = require('../models/sslCommerz')
const { ObjectId } = require('mongodb');
// sslcommerce
const SSLCommerzPayment = require('sslcommerz-lts')

// sslCommerz store id/password
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false //true for live, false for sandbox

// post payment data
const postPaymet = async (req, res) => {
    // console.log(req.body)
    const order = req.body
    const tran_id = new ObjectId().toString()
    const data = {
        total_amount: order?.subTotal,
        currency: order?.currency,
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: order?.user_name,
        cus_email: order?.user_email,
        cus_add1: order?.location,
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    // console.log(data)
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.send({ url: GatewayPageURL })
        // console.log('Redirecting to: ', GatewayPageURL)
    });
    // try {
    //     const newOrder = new SSLCommerzModel(req.body)
    //     console.log(newOrder)
    // } catch (error) {
    //     res.status(500).json({
    //         status: false,
    //         message: err.message,
    //     });
    // }

}

module.exports = {
    postPaymet
}