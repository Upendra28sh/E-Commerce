const mongoose = require('mongoose');
const transformSchema = require('./utils/schemaTransform');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    images: [String],
    sizes: {
        type : [String] ,
        default : []
    },
    codAccepted: {
        type : Boolean ,
        default: false
    },
    returnAccepted:{
        type : Boolean ,
        default: false
    },
    description: String,

    keywords: [String],

    in_my_wishlist : {type : Boolean , default : false},

    category: {
        name: String,
        title: String
    },

    approval: {
        approved: {
            type: Boolean,
            default: false
        },
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