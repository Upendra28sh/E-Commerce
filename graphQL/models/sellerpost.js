const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const Comment = new mongoose.Schema({
    text : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const SellerpostSchema = new mongoose.Schema({
    image: String,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    caption: String,
    timestamp: String ,
    Comments : [Comment]
}, {versionKey: false});

module.exports = mongoose.model('Sellerpost', transformSchema(SellerpostSchema));