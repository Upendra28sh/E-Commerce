const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');


const sellerSchema = new mongoose.Schema({
    name: String,
    image: String,

    shopName: String,
    password : String,

    intro: String,
    about: String,

    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],

    legal: {
        aadhar: String,
        pan: String,
        gst: String,
        bank: {
            name: String,
            accountNumber : Number,
            ifscCode : String
        }
    },
    policy: {
        store: String,
        return: String
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    versionKey: false
});

module.exports = mongoose.model('Seller', transformSchema(sellerSchema));