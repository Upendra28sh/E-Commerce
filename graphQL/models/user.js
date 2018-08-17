const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    image: String,
    about: String
}, { versionKey: false });

module.exports = mongoose.model('User', transformSchema(userSchema));