const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');


const sellerSchema = new mongoose.Schema({
    shopname: String,
    name: String,
    image: String,
    intro : String,
    about: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    legalInfo: {
        aadhar: String,
        pan: String,
        gst: String,
        bank: String
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