const Product = require('../models/product');
const Address = require('../models/address');
const Seller = require('../models/seller');
import jwt from 'jsonwebtoken';
import config from '../config';
import {createApprovalRequest} from "./utils";

function compare(a,b) {
    if (a.followers.length > b.followers.length)
        return -1;
    if (a.followers.length < b.followers.length)
        return 1;
    return 0;
}

module.exports = {
    Query: {
        allSellers: (parent, args, context, info) => {
            return Seller.find({}).populate('followers').exec().then(
                data => data
            );
        },

        Seller: (parent, { shopName }, context, info) => {
            return Seller.findOne({
                "shopName": shopName
            }).populate('followers').exec().then(
                data => data
            );
        },
        getSeller: (parent, args, { seller }, info) => {
            return Seller.findOne({
                "_id": seller.id
            }).populate('followers').exec().then(
                data => data
            );
        },

        getSellers: (parent, args, context, info) => {
            return Seller.find({
                '_id': {
                    $in: args.ids
                }
            }).populate('followers').exec().then(data => data);
        },

        checkShopnameAvailability: (parent, { shopName }, context, info) => {
            return Seller.findOne({
                shopName: shopName
            }).exec().then(
                data => !data
            );
        },

        getSellerAddress: (parent, args, {seller}, info) => {
            return Seller.findOne({
                _id: seller.id
            }).then(
                data => {
                    // console.log(data);
                    return data.address;
                }
            )
        },

        getTopSellers: (parent, args, input, info) => {
            return Seller.find().exec()
                .then(
                    data => {
                        // console.log(data);
                        data.sort(compare);
                        data.splice(10);
                        return data;
                    }
                )
        }
    },

    Mutation: {
        addSeller: (parents, {input}, context, info) => {

            console.log(input);
            let {address} = input;
            delete input.address;

            return Seller.create({
                ...input
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
                            createdSeller.address = [createdAddress];
                            createdSeller.save();
                            createApprovalRequest('Seller', createdSeller.id);

                            return createdSeller;
                        }
                    );
                }
            );
        },

        // Modify update seller to update address
        updateSeller: (parents, {
            sellerID,
            input
        }, context, info) => {

            let {
                shopName,
                name,
                image,
                about,
                intro,
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
                    intro: intro,
                    shopName: shopName,
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
        },
        SellerLogin: (parent, {input}, context, info) => {
            console.log(input);
            let {shopName, password} = input;

            return Seller.findOne({shopName}).exec()
                .then(
                    foundSeller => {
                        if (foundSeller) {
                            const passwordIsValid = foundSeller.comparePassword(password);
                            if (!passwordIsValid) {
                                return {
                                    token: {
                                        code: 3,
                                        content: "Invalid Password"
                                    }
                                };
                            } else {
                                const token = jwt.sign(
                                    {
                                        id: foundSeller._id,
                                        name: foundSeller.name,
                                        image: foundSeller.image,
                                        about: foundSeller.about,
                                        shopName: foundSeller.shopName,
                                        seller : true
                                    },
                                    config.secret,
                                    {expiresIn: 86400}
                                );
                                return {
                                    token: {
                                        code: 1,
                                        content: token
                                    }
                                };
                            }
                        } else {
                            return {
                                token: {
                                    code: 4,
                                    content: "Shop not Found"
                                }
                            };
                        }
                    }
                );
        }
    }
};