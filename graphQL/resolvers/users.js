const User = require('../models/user');
const axios = require('axios');
const Seller = require('../models/seller');
const Product = require('../models/product')
const config = require('../config');
var _ = require('lodash');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;

module.exports = {
    Query: {
        allUsers: (parent, args, context, info) => {
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
        // getFeedProducts:(parent, args, context, info)=>{
        //     let products=[];
        //     User.findOne({
        //         username: args.username
        //     }).populate('followers').populate('following').populate('followingShop').populate('followNotify.User').exec().then(
        //         data =>{
        //              data.followingShop.forEach((seller)=>{
        //                 Product.find({
        //                     sellerID: seller._id
        //                 }).exec().then(data=>{
        //
        //                     products = data.concat(products)
        //                     }).then(console.log(products));
        //
        //             })
        //             console.log(products);
        //
        //         }
        //     );
        //     return products;
        // }
    },

    Mutation: {
        followUser: (parents, args, context, info) => {
            return User.findOne({
                _id: "5b7ffe9577b51d4220dd83f2"
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
                            id: "5b7ffe9577b51d4220dd83f2"
                        }) == null) {
                        user.followers.push("5b7ffe9577b51d4220dd83f2");
                        user.followNotify.push({
                            User: "5b7ffe9577b51d4220dd83f2",
                            read: false
                        });
                        let config = {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'key=AAAA7LYsFxY:APA91bHwbibSzEi2itJ_VlvRtaIvVr4FBNGag7qLqEGR-0LmWAdXnaBfuoxEMr86VwxUbvdSlAyKcLtp4IkPc6pmOUirGFJK4L0fSaj9GCweKOd0DzSQQULWldSsw0rHQiukNt63rZWm'
                            }
                        }

                        let data = {
                            "notification": {
                                "title": "E-commerce",
                                "body": ` ${user.username} has followed you`,
                                "click_action": `http://localhost:3000/user/${user.username}`,
                                "icon": "http://localhost:3000/favicon.ico"
                            },
                            "to": user.UserToken
                        }

                        axios.post("https://fcm.googleapis.com/fcm/send", data, config).then(({
                            data
                        }) => {
                            console.log(data);
                            user.save();
                        }).catch((err) => {
                            console.log(err)
                        });

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