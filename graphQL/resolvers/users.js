const User = require('../models/user');
const axios = require('axios');
const Seller = require('../models/seller');
const _ = require('lodash');
import {createdNotificationFollow} from './utils';


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
        },
        checkUserNameAvailability: (parent, args, context, info) => {
            return User.findOne({
                username: args.username
            }).then(data => {
                if (data) {
                    return false;
                }
                return true;
            });
        },
        getUserAddresses: (parent, args, context, info) => {
            let userId = context.user.id;
            return User.findOne({
                _id: userId
            }).then(foundUser => {
                console.log(foundUser.address);
                return foundUser.address;
            });
        }
    },

    Mutation: {
        addUserAddress: (parents, args, context, info) => {
            // console.log()
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $addToSet: {
                    address: args.input.address
                }

            } , {new : true}).exec()
                .then(data => {
                    console.log(data);
                    return data.address[data.address.length - 1];
                });

        },

        followUser: (parents, args, context, info) => {
            return User.findOneAndUpdate({
                _id: context.user.id
            }, {
                $addToSet: {
                    following: args.FollowingID
                }

            })
                .populate('following')
                .exec()
                .then(
                    (data) => {
                        return User.findOneAndUpdate({
                            _id: args.FollowingID
                        }, {
                            $addToSet: {
                                followers: context.user.id
                            }
                        })
                            .populate('followers')
                            .exec()
                            .then(
                                info => {
                                    createdNotificationFollow(data, info);
                                    return info;
                                }
                            );
                    }
                );
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
                })
                    .populate('followers')
                    .exec()
                    .then(
                        data => {
                            return data;
                        }
                    );
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