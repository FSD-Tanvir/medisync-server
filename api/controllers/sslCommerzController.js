const SSLCommerzModel = require('../models/sslCommerz')
const { ObjectId } = require('mongodb');
require("dotenv").config();
const SSLCommerzPayment = require('sslcommerz-lts');
const express = require("express");
const cors = require("cors");
const ProductCarts = require('../models/productCart');
const app = express();


const store_id = "teamp65d7090b9e99f";
const store_passwd = "teamp65d7090b9e99f@ssl";
const is_live = true; // true for live, false for sandbox

// get all orders
const AllOrders = async (req,res)=>{
    try{
        const allOrders = await SSLCommerzModel.find()

        res.status(200).json({
            status:true,
            message:"All orders gotten successfully",
            allOrders,
        })
    }catch (err){
        res.status(500).json({
            status:false,
            message:'Internal server error',err,
        })
    }
}
// get all orders - user specific 
const getAllOrders = async (req,res)=>{
    try{
        const allOrders = await SSLCommerzModel.find({user_email:req.params.userEmail})

        res.status(200).json({
            status:true,
            message:"All orders gotten successfully",
            allOrders,
        })
    }catch (err){
        res.status(500).json({
            status:false,
            message:'Internal server error',err,
        })
    }
}


const postPayment = async (req, res) => {
    try {
        const order = req.body;
        const tranId = new ObjectId().toString();
        const data = {
            total_amount: order.subTotal,
            currency: order?.currency,
            tran_id: tranId, // use unique tran_id for each api call
            success_url: `http://localhost:5000/payment/success/${tranId}?userEmail=${order.user_email}`,
            fail_url: `http://localhost:5000/payment/failed/${tranId}`,
            cancel_url: `http://localhost:5000/allOrders/payment/cancel/${tranId}?canceled=${true}`,
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: order.user_name,
            cus_email: order.user_email,
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
        const sslresponse= await sslcz.init(data)
        console.log(sslresponse)
        if(sslresponse.status === "SUCCESS"){
            let GatewayPageURL = sslresponse.GatewayPageURL
            const newOrder = new SSLCommerzModel({
                orderId:tranId,
                products: order.products,
                total_amount: order.subTotal,
                currency: order.currency,
                user_name: order.user_name,
                user_email: order.user_email,
                location: order.location,
                transactionId: tranId,
            });
    
            const savedOrder = await newOrder.save();
            console.log(savedOrder)
            if(savedOrder){
                res.json({ url: GatewayPageURL });
            }
        }
        // .then(async apiResponse => {
        //     // Redirect the user to payment gateway
        //     let GatewayPageURL = apiResponse.GatewayPageURL

           
        // const newOrder = new SSLCommerzModel({
        //     orderId:tranId,
        //     products: order.products,
        //     total_amount: order.subTotal,
        //     currency: order.currency,
        //     user_name: order.user_name,
        //     user_email: order.user_email,
        //     location: order.location,
        //     transactionId: tranId,
        // });

        // const savedOrder = await newOrder.save();

        // if(savedOrder){
        //     res.send({ url: GatewayPageURL });
        // }
        // });

    } catch (error) {
        console.error('Error during SSLCommerzPayment initialization:', error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
// update order after successfully payment
const updateOrder = async (req, res) => {
    try {

        // deleting all products from user cart after successfully ordered 
        if(req.query.userEmail){
            await ProductCarts.deleteMany({email:req.query.userEmail})
        }

        const result = await SSLCommerzModel.updateOne({ transactionId: req.params.tranId }, {
            $set: {
                paidStatus: true,
            }
        });

        if (result.modifiedCount > 0) {
            res.redirect(`http://localhost:5173/order/success/${req.params.tranId}`);
        } else {
            res.status(404).json({
                status: false,
                message: 'Transaction ID not found or not modified',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}
// delete order if order canceled or failed
const deleteOrder = async (req, res) => {
    try {
        const result = await SSLCommerzModel.findOneAndDelete({ transactionId: req.params.tranId });
        if(!result){
            return res.status(404).json({status:false,message:"Order not found"})
        }
        if (req.query.canceled) {
            res.redirect(`http://localhost:5173/checkout`);
        } else {
            res.redirect(`http://localhost:5173/checkout`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    getAllOrders,
    AllOrders,
    postPayment,
    updateOrder,
    deleteOrder,
}
