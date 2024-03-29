const mongoose = require('mongoose')
const { Schema } = mongoose;

const sslCommerzSchema = new Schema({
    orderId:{
        type:String, required:true, unique:true
    },
    products: [{
        _id: { type: String, required: true },
        productItemId: { type: String, required: true },
        name: { type: String, required: true },
        weight: { type: String, required: true },
        company: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        email: { type: String, required: true }
    }],
    total_amount: { type: Number, required: true },
    currency: { type: String, required: true },
    transactionId: { type: String},
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    paidStatus: { type: Boolean, default:false },
    orderStatus:{type:String,default:'pending'},

    location:{ type: String, required: true },
    orderDate:{
        type:Date,
        default:Date.now
    }
})

// Create a Mongoose model
const SSLCommerzModel = mongoose.model('SSLCommerz', sslCommerzSchema);

module.exports = SSLCommerzModel;