const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const Comment = new mongoose.Schema({
    text: String,
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
    comments: {
        type :  [Comment] ,
        default : []
    }
}, {
    versionKey: false, timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Sellerpost', transformSchema(SellerpostSchema));