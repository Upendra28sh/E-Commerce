const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    size: [String],

    codAccepted: Boolean,
    returnAccepted: Boolean,

    description: String,

    keywords: [String],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
}, {versionKey: false});

module.exports = mongoose.model('Product', transformSchema(productSchema));