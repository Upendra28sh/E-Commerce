const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');


const sellerSchema = new mongoose.Schema({
    shopname: String,
    name: String,
    image: String,
    about: String,
    address: {
        address: String,
        street: String,
        city: String,
        state: String,
        zipcode: Number
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
    }
}, { versionKey: false });

module.exports = mongoose.model('Seller', transformSchema(sellerSchema));