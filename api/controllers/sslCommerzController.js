const SSLCommerzModel = require('../models/sslCommerz')
const { ObjectId } = require('mongodb');
require("dotenv").config();
const SSLCommerzPayment = require('sslcommerz-lts');
const express = require("express");
const cors = require("cors");
const app = express();


const store_id = "teamp65d7090b9e99f";
const store_passwd = "teamp65d7090b9e99f@ssl";
const is_live = false; // true for live, false for sandbox

const postPaymet = async (req, res) => {
    try {
        const order = req.body;
        const tranId = new ObjectId().toString();
        // const data = {
        //         products: order.products || [],
        //         total_amount: order?.subTotal || 0,
        //         currency: order?.currency || '',
        //         tran_id: tranId,
        //         success_url: `http://localhost:5000/allOrders/payment/success/${tranId}`,
        //         fail_url: 'http://localhost:3030/fail',
        //         cancel_url: 'http://localhost:3030/cancel',
        //         ipn_url: 'http://localhost:3030/ipn',
        //         user_name: order?.user_name || '',
        //         user_email: order?.user_email || '',
        //         location: order?.location || '',
        //     };
        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: 'REF123', // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
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
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.redirect(GatewayPageURL)
            console.log('Redirecting to: ', GatewayPageURL)
        });

        // const data = {
        //     products: order.products || [],
        //     total_amount: order?.subTotal || 0,
        //     currency: order?.currency || '',
        //     tran_id: tranId,
        //     success_url: `http://localhost:5000/allOrders/payment/success/${tranId}`,
        //     fail_url: 'http://localhost:3030/fail',
        //     cancel_url: 'http://localhost:3030/cancel',
        //     ipn_url: 'http://localhost:3030/ipn',
        //     user_name: order?.user_name || '',
        //     user_email: order?.user_email || '',
        //     location: order?.location || '',
        // };
        // // console.log(data)
        // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        // sslcz.init(data).then( async apiResponse => {
        //     // Redirect the user to payment gateway
        //     let GatewayPageURL =apiResponse.GatewayPageURL
        //     console.log('Redirecting to: ', GatewayPageURL)
        //     res.send({url:GatewayPageURL})
            

        // })
        //    res.send({ url: GatewayPageURL });
        // const newOrder = new SSLCommerzModel({
        //     orderId: tranId,
        //     products: order.products,
        //     total_amount: order.subTotal,
        //     currency: order.currency,
        //     success_url: data.success_url,
        //     fail_url: data.fail_url,
        //     cancel_url: data.cancel_url,
        //     ipn_url: data.ipn_url,
        //     user_name: order.user_name,
        //     user_email: order.user_email,
        //     location: order.location,
        //     paidStatus: false,
        //     tranjectionId: tranId,
        // });

        // await newOrder.save();
        // console.log("After saving order to the database");

    } catch (error) {
        console.error('Error during SSLCommerzPayment initialization:', error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

const tranId = async (req, res) => {
    console.log(req.body.tranId)
    // try {
    //     const result = await SSLCommerzModel.updateOne({ tranjectionId: req.params.tranId }, {
    //         $set: {
    //             paidStatus: true,
    //         }
    //     });

    //     if (result.modifiedCount > 0) {
    //         res.redirect(`http://localhost:5173/payment/success/${req.params.tranId}`);
    //     } else {
    //         res.status(404).json({
    //             status: false,
    //             message: 'Transaction ID not found or not modified',
    //         });
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //         status: false,
    //         message: error.message,
    //     });
    // }
}

module.exports = {
    postPaymet,
    tranId
}
