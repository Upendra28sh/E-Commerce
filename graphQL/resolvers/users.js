const User = require('../models/user');
const Seller = require('../models/seller');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
            return User.find({}).populate('following').populate('followers').populate('followingShop').exec();
        },
        User: (parent, args, context, info) => {
            return User.findOne({
                username: args.username
            }).populate('followers').populate('following').populate('followingShop').exec();
        }
    },

    Mutation: {
        followUser: (parents, args, context, info) => {
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $addToSet: {
                    following: args.FollowingID
                }

            }).populate('following').exec().then((data) => {
                User.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $addToSet: {
                        followers: args.UserID
                    }
                }).populate('followers').exec().then(data => {
                    data
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
                        followers: args.UserID
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
                        followers: args.UserID
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
                        followers: args.UserID
                    }
                }).populate('followers').exec().then(data => data)
            });
        },
    }
};