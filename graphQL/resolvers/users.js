const User = require('../models/user');
const axios = require('axios');
const Seller = require('../models/seller');
const _ = require('lodash');


module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
            console.log(context.seller);
            return User.find({})
                .populate('address')
                .populate('following')
                .populate('followers')
                .populate('followingShop')
                .populate('followNotify.User')
                .exec();
        },
        User: (parent, args, context, info) => {
            return User.findOne({
                username: args.username
            })
                .populate('address')
                .populate('followers')
                .populate('following')
                .populate('followingShop')
                .populate('followNotify.User')
                .exec();
        } ,
        checkUserNameAvailability : (parent , args , context , info ) => {
            return User.findOne({
                username : args.username
            }).then(data => {
                if(data){
                    return false;
                }
                return true ;
            })
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
                return User.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $addToSet: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data);
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
                return User.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $pull: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data);
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
                return Seller.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $addToSet: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data);
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
                return Seller.findOneAndUpdate({
                    _id: args.FollowingID
                }, {
                    $pull: {
                        followers: context.user.id
                    }
                }).populate('followers').exec().then(data => data);
            });
        },
        Notify: (parents, args, context, info) => {
            return User.findOne({
                email: args.Email
            }).exec().then((user) => {
                console.log(context.user);
                user.UserToken = args.UserToken;
                console.log(user.UserToken);
                user.save();

            });

        }

    }
};