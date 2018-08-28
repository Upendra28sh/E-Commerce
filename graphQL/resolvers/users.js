const User = require('../models/user');
const Seller = require('../models/seller');
const Product = require('../models/product')
const config = require('../config');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
            return User.find({}).populate('following').populate('followers').populate('followingShop').populate('followNotify.User').exec();
        },
        User: (parent, args, context, info) => {
            return User.findOne({
                username: args.username
            }).populate('followers').populate('following').populate('followingShop').populate('followNotify.User').exec();
        },
        getFeedProducts:(parent, args, context, info)=>{
            let products=[];
            User.findOne({
                username: args.username
            }).populate('followers').populate('following').populate('followingShop').populate('followNotify.User').exec().then(
                data =>{
                     data.followingShop.forEach((seller)=>{
                        Product.find({
                            sellerID: seller._id
                        }).exec().then(data=>{
                            
                            products = data.concat(products)
                            }).then(console.log(products));
                            
                    })
                    console.log(products);
                
                }
            );
            return products;
        }
    },

    Mutation: {
        followUser: (parents, args, context, info) => {
            return User.findOne({
                _id: context.user.id
            }, ).populate('following').exec().then((user) => {
                if (_.find(user.following, {
                        id: args.FollowingID
                    }) == null) {
                    user.following.push(args.FollowingID);
                    user.save();
                }


                User.findOne({
                    _id: args.FollowingID
                }).populate('followers').exec().then(user => {
                    if (_.find(user.followers, {
                            id: context.user.id
                        }) == null) {
                        user.followers.push(context.user.id);
                        user.followNotify.push({
                            User: context.user.id,
                            read: false
                        });
                        user.save();
                    }
                })
            });
        },
        unFollowUser: (parents, args, context, info) => {
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $pull: {
                    following: args.FollowingID
                }

            }).populate('following').exec().then((data) => {
                User.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $pull: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data)
            });
        },
        followShop: (parents, args, context, info) => {
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $addToSet: {
                    followingShop: args.FollowingID
                }

            }).populate('followingShop').exec().then((data) => {
                Seller.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $addToSet: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data)
            });
        },
        unFollowShop: (parents, args, context, info) => {
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $pull: {
                    followingShop: args.FollowingID
                }

            }).populate('followingShop').exec().then((data) => {
                Seller.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $pull: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data)
            });
        },
    }
};