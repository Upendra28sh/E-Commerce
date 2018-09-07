const Wishlist = require('../models/wishlist');
const User = require('../models/user');

module.exports = {
    Query: {
        showWishlist: (parent, args, context, info) => {
            const userID = args.user;
            const signedInUser = context.user.id;

            if (userID === signedInUser) {
                return Wishlist.findOne({user: userID})
                    .populate({
                        path: 'products',
                        populate: {
                            path: 'seller'
                        }
                    })
                    .populate('user')
                    .exec();
            } else {
                return User.findOne({_id: userID}).then(
                    foundUser => {
                        if (foundUser.followers.includes(signedInUser))
                            return Wishlist.findOne({user: userID})
                                .populate({
                                    path: 'products',
                                    populate: {
                                        path: 'seller'
                                    }
                                })
                                .populate('user')
                                .exec();
                    }
                )
            }
        },
        checkInWishlist: (parent, {productID}, context, info) => {
            const userID = context.user.id;
            return Wishlist.findOne({user: userID}).then(
                foundWishlist => {
                    if (!foundWishlist) {
                        return false;
                    } else {
                        return foundWishlist.products.find(
                            product => product == productID
                        );
                    }
                }
            );
        }
    },
    Mutation: {
        addToWishlist: (parent, {productID}, context, info) => {
            const userID = context.user.id;

            return Wishlist.findOne({user: userID}).exec().then(
                foundWishlist => {
                    if (!foundWishlist) {
                        return Wishlist.create({
                            user: userID,
                        }).then(
                            createdWishlist => {
                                createdWishlist.products.push(productID);
                                createdWishlist.save();
                                return createdWishlist
                                    .populate({
                                        path: 'products',
                                        populate: {
                                            path: 'seller'
                                        }
                                    })
                                    .populate('user')
                                    .execPopulate()
                                    .then(data => data.toJSON());
                            }
                        );
                    } else {
                        foundWishlist.products.push(productID);
                        foundWishlist.save();
                        return foundWishlist
                            .populate({
                                path: 'products',
                                populate: {
                                    path: 'seller'
                                }
                            })
                            .populate('user')
                            .execPopulate()
                            .then(data => data.toJSON());
                    }
                }
            );
        },
        removeFromWishlist: (parent, {productID}, context, info) => {
            const userID = context.user.id;
            console.log("REMOVE FROM WISH LIST", userID, productID);
            return Wishlist.findOne({user: userID}).exec().then(
                foundWishlist => {
                    foundWishlist.products = foundWishlist.products.filter(
                        product => product != productID
                    );

                    foundWishlist.save();
                    return foundWishlist
                        .populate({
                            path: 'products',
                            populate: {
                                path: 'seller'
                            }
                        })
                        .populate('user')
                        .execPopulate()
                        .then(data => data.toJSON());
                }
            );
        }
    }
};