const Product = require('../models/product');
const Address = require('../models/address');
const Seller = require('../models/seller');

module.exports = {
    Query: {
        allSellers: (parent, args, context, info) => {
            return Seller.find({}).populate('followers').exec().then(
                data => data
            )
        },

        Seller: (parent, {
            shopname
        }, context, info) => {
            return Seller.findOne({
                "shopname": shopname
            }).populate('followers').exec().then(
                data => data
            )
        },
        getSellers: (parent, args, context, info) => {
            return Seller.find({
                '_id': {
                    $in: args.ids
                }
            }).populate('followers').exec().then(data => data);
        },
        checkShopnameAvailability: (parent, {
            shopname
        }, context, info) => {
            return Seller.findOne({
                shopname: shopname
            }).exec().then(
                data => !data
            )
        }
    },

    Mutation: {
        addSeller: (parents, { input }, context, info) => {

            let {
                name,
                image,
                about,
                shopname,
                address,
                legalInfo,
                policy
            } = input;

            return Seller.create({
                name: name,
                image: image,
                about: about,
                shopname: shopname,
                legalInfo: legalInfo,
                policy: policy
            }).then(
                createdSeller => {
                    return Address.create({
                        address: address.address,
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        zipcode: address.zipcode
                    }).then(
                        createdAddress => {
                            createdSeller.address = createdAddress;
                            createdSeller.save();
                            return createdSeller;
                        }
                    )
                }
            );
        },

        // Modify update seller to update address

        updateSeller: (parents, {
            sellerID,
            input
        }, context, info) => {

            let {
                shopname,
                name,
                image,
                about,
                address,
                legalInfo,
                policy
            } = input;

            return Seller.findOneAndUpdate({
                _id: sellerID
            }, {
                $set: {
                    name: name,
                    image: image,
                    about: about,
                    shopname: shopname,
                    address: address,
                    legalInfo: legalInfo,
                    policy: policy
                }
            }, {
                new: true
            }).exec().then(
                data => {
                    // console.log(data);
                    return data;
                }
            );
        },

        removeSeller: (parents, args, context, info) => {
            return Seller.findOneAndDelete({
                _id: args.sellerID
            }).exec().then(
                data => data
            );
        }
    }
}