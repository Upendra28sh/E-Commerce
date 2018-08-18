const Product = require('../models/product');
const Seller = require('../models/seller');

const normalizeKeywords = (keywords) => {
    // TODO : Implement it to normalize keywords entered by user.
    // Consult with Nikhil Pandey
    return keywords || [];
};

module.exports = {
    Query: {
        // TODO : Implement Pagination and Filters...
        // Consult with Apollo Client for Requirements
        allProducts: (parent, args, context, info) => {
            return Product.find({}).populate('seller').exec().then(
                data => data
            );
        },

        Product: (parent, args, context, info) => {
            return Product.findById(args.id).populate('seller').exec().then(
                data => data
            );
        },
    },

    Mutation: {
        // TODO : Add Seller Field from Token
        addProduct: (parents, {input, ...args}, context, info) => {
            // console.log(input, args);
            return Product.create({
                name: input.name,
                price: input.price,
                image: input.image,
                description: input.description,
                sizes: input.sizes || [],
                codAccepted: input.codAccepted || false,
                returnAccepted: input.returnAccepted || false,
                keywords: normalizeKeywords(input.keywords),
                sellerID: "5b65ec564299f042002ef1e9"
            }).then(
                createdProduct => {
                    return {
                        product: createdProduct
                    };
                }
            );
        },

        updateProduct: (parents, args, context, info) => {
            return Product.findOneAndUpdate({_id: args.productID}, {
                $set: {
                    name: args.name,
                    price: args.price,
                    image: args.image,
                    description: args.description
                }
            }, {new: true}).populate('seller').exec().then(
                data => data
            );
        },

        removeProduct: (parents, args, context, info) => {
            return Product.findOneAndDelete({_id: args.productID}).populate('seller').exec().then(
                data => data
            );
        }
    }
};