const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: {
        type: String
    },
    name: String,
    image: String,
    about: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followingShop: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }],
}, {
    versionKey: false
});

module.exports = mongoose.model('User', transformSchema(userSchema));