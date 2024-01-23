const mongoose = require('mongoose')
const {Schema} = mongoose;

// create schema object for productItems

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    weight: String,
    company: String,
    image: String, 
    category: String,
    description: String,
    price: Number,

})

const Product = mongoose.model("Product",productSchema)
module.exports = Product;
