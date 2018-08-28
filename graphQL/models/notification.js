const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const notificationSchema = new mongoose.Schema({
    text: String,
    to: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    versionKey: false
});

module.exports = mongoose.model('Notification', transformSchema(notificationSchema));