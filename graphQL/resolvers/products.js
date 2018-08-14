const Product = require('../models/product');
const Seller = require('../models/seller');

module.exports = {
    Query: {
        allProducts: (parent, args, context, info) => {
            return Product.find({}).populate('seller').exec().then(
                data => data
            )
        },

        Product: (parent, args, context, info) => {
            return Product.findById(args.id).populate('seller').exec().then(
                data => data
            )
        },
    },

    Mutation: {
        addProduct: (parents, args, context, info) => {
            return Seller.findOne({_id: args.sellerID}).exec()
            .then(
                foundSeller => {
                    return Product.create({
                        name: args.name,
                        price: args.price,
                        image: args.image,
                        description: args.description
                    }). then(
                        createdProduct => {
                            createdProduct.seller = foundSeller;
                            createdProduct.save();
                            return createdProduct;
                        }
                    );
                } 
            )
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
}