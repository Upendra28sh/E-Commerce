const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const SellerpostSchema = new mongoose.Schema({
    image: String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    caption: String,
    timestamp: String
}, {versionKey: false});

module.exports = mongoose.model('Sellerpost', transformSchema(SellerpostSchema));