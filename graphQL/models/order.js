const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');
import Address from './address'

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
    order_number : String,
    discount: Number,
    total: Number,
    date: Date,
    shipping: {
        status: String,
        address: Address
    },
    payment: {
        status: String,
        mode: String
    },
    status: {
        confirmed: {type : Boolean , default : false},
        packed: {type : Boolean , default : false},
        shipped: {type : Boolean , default : false},
        delivered: {type : Boolean , default : false},
    }

}, {versionKey: false});

module.exports = mongoose.model('Order', transformSchema(orderSchema));