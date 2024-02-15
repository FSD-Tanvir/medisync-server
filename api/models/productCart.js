const mongoose = require('mongoose')
const { Schema } = mongoose;

// create schema object for productCart

const productCartSchema = new Schema({
    productItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    weight: String,
    company: String,
    image: String,
    price: Number,
    quintity:Number,
    totalPrice:Number,
    email: {
        type: String,
        trim: true,
        required: true,
    },
})

const ProductCarts = mongoose.model("ProductCart",productCartSchema)
module.exports = ProductCarts