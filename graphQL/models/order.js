const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    discount: Number,
    shipping: Number,
    Total:Number,
    paymode:String,
    city:String,
    Confirmed:Boolean,
    Packed:Boolean,
    Shipped:Boolean,
    Delivered:Boolean,
    date:Number,
    PayStatus:String
}, { versionKey: false });

module.exports = mongoose.model('Order', transformSchema(orderSchema));