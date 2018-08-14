const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');


const sellerSchema = new mongoose.Schema({
    name: String,
    image: String,
    about: String
}, { versionKey: false });

module.exports = mongoose.model('Seller', transformSchema(sellerSchema));