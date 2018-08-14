const Product = require('../models/product');
const Seller = require('../models/seller');

module.exports = {
    Query: {
        allSellers: (parent, args, context, info) => {
            return Seller.find({}).exec().then(
                data => data
            )
        },

        Seller: (parent, args, context, info) => {
            return Seller.findById(args.id).exec().then(
                data => data
            )
        } ,
        getSellers: (parent , args, context, info) => {
            return Seller.find({
                '_id' : { $in : args.ids }
            }).exec().then(data => data);
        }
    },

    Mutation: {
        addSeller: (parents, args, context, info) => {
            return Seller.create({
                name: args.name,
                image: args.image,
                about: args.about
            }).then(
                data => data
            );
        },

        updateSeller: (parents, args, context, info) => {
            return Seller.findOneAndUpdate({_id: args.sellerID}, {
                $set: {
                    name: args.name,
                    image: args.image,
                    about: args.about
                }
            }, {new: true}).exec().then(
                data => data
            );
        },

        removeSeller: (parents, args, context, info) => {
            return Seller.findOneAndDelete({_id: args.sellerID}).exec().then(
                data => data
            );
        }
    }
}