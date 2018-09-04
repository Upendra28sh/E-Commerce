const Product = require('../models/product');
const Seller = require('../models/seller');
var _ = require('lodash');

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


        getProductBySeller: (parent, {
            seller
        }, context, info) => {
            return Product.find({
                seller: seller
            }).populate('seller').exec().then(
                data => data
            );

        },

        getProducts: (parent, args, context, info) => {
            return Product.find({}).populate('seller').exec().then(
                data => {
                    let temp = [];
                    for (let i of data) {
                        if (i.name.toLowerCase() == args.filter.toLowerCase()) {
                            temp.push(i);
                            data.splice(i, 1);
                            continue;
                        }
                    }
                    for (let i of data) {
                        if (i.name.toLowerCase().includes(args.filter.toLowerCase())) {
                            temp.push(i);
                            continue;
                        }
                        if (i.name.toLowerCase().includes(args.filter.toLowerCase())) {
                            temp.push(i);
                            continue;
                        }
                        for (let j in i.keywords) {
                            if (j.toLowerCase().includes(args.filter.toLowerCase())) {
                                temp.push(i);
                                break;
                            }
                        }
                    }
                    return temp;
                }
            );
        },
    },

    Mutation: {
        // TODO : Add Seller Field from Token
        addProduct: (parents, {
            input,
            ...args
        }, context, info) => {
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
                seller: "5b65ec564299f042002ef1e9"
            }).then(
                createdProduct => {
                    return createdProduct.populate('sellerID').execPopulate().then(
                        data => ({
                            product: data.toJSON()
                        })
                    );
                }
            );
        },

        updateProduct: (parents, {
            input,
            ...args
        }, context, info) => {


            return Product.findOneAndUpdate({
                _id: input.productID
            }, {
                $set: {
                    name: input.name,
                    price: input.price,
                    image: input.image,
                    description: input.description,
                    sizes: input.sizes || [],
                    codAccepted: input.codAccepted || false,
                    returnAccepted: input.returnAccepted || false,
                    keywords: normalizeKeywords(input.keywords)
                }
            }, {
                new: true
            }).populate('seller').exec().then(
                data => data
            );
        },

        removeProduct: (parents, args, context, info) => {
            return Product.findOneAndDelete({
                _id: args.productID
            }).populate('seller').exec().then(
                data => data
            );
        }
    }
};