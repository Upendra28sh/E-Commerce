const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product' 
            },
            itemCount: Number,
            selectedSize: String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    discount: Number,
    total: Number,
    date: Date,
    shipping: {
        status: String,
        address: {
            address: String,
            street: String,
            city: String,
            state: String,
            zipcode: Number
        }
    },
    payment: {
        status: String,
        mode: String
    },
    status: {
        confirmed: Boolean,
        packed: Boolean,
        shipped: Boolean,
        delivered: Boolean,
    }

}, {versionKey: false});

module.exports = mongoose.model('Order', transformSchema(orderSchema));