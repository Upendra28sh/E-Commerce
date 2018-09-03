const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    sizes: [String],

    codAccepted: Boolean,
    returnAccepted: Boolean,

    description: String,

    keywords: [String],

    approval: {
        approved: Boolean,
        comment: String
    }, // To Be Used For Product Approval By Admin

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Product', transformSchema(productSchema));