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
    shipping: Number
}, { versionKey: false });

module.exports = mongoose.model('Order', transformSchema(orderSchema));