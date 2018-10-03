const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');
import bcrypt from 'bcryptjs';
import Address from './address';

const sellerSchema = new mongoose.Schema({
    name: String,
    image: String,

    shopName: {
        type: String,
        unique: true
    },
    password: String,
    // Used for Auth

    intro: String,
    about: String,

    address: [Address],

    legal: {
        aadhar: String,
        pan: String,
        gst: String,
        bank: {
            name: String,
            accountNumber: Number,
            ifscCode: String
        }
    },
    policy: {
        store: String,
        return: String
    },
    followers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }] ,
        default : []
    },
}, {
    versionKey: false
});

sellerSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    let hash = bcrypt.hashSync(user.password);
    user.password = hash;
    next();
});

sellerSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('Seller', transformSchema(sellerSchema));