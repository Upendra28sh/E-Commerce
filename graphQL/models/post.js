const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    timestamp: String
}, {versionKey: false});

module.exports = mongoose.model('Post', transformSchema(PostSchema));