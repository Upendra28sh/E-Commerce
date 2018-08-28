const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const SellerpostSchema = new mongoose.Schema({
    type: String,
    image: String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    caption: String,
    timestamp: String
}, {versionKey: false});

// product: empty if type == new, fill image with the uploaded image
// image: empty if type == shared, leave image empty

module.exports = mongoose.model('Sellerpost', transformSchema(SellerpostSchema));