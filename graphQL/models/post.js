const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const Comment = new mongoose.Schema({
    text : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    caption: String,
    timestamp: String,
    Comments : [Comment]
}, {versionKey: false});

module.exports = mongoose.model('Post', transformSchema(PostSchema));