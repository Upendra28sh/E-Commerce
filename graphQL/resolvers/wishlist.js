const Wishlist = require('../models/wishlist');

module.exports = {
    Query: {
        showWishlist: (parent, args, context, info) => {
            const userID = context.user.id;

            return Wishlist.findOne({user: userID})
                .populate({
                    path: 'products',
                    populate: {
                        path: 'sellerID'
                    }
                })
                .populate('user')
                .exec()
        },
        checkInWishlist: (parent, {productID}, context, info) => {
            console.log(context);
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
            )
        }
    },
    Mutation: {
        addToWishlist: (parent, { productID }, context, info) => {   
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
                                            path: 'sellerID'
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
                                    path: 'sellerID'
                                }
                            })
                            .populate('user')
                            .execPopulate()
                            .then(data => data.toJSON());
                    }
                }
            );
        },
        removeFromWishlist: (parent, { productID }, context, info) => {   
            const userID = context.user.id;
            console.log(context);
            console.log(productID);
            return null;
            // return Wishlist.findOne({user: userID}).exec().then(
            //     foundWishlist => {
            //         console.log(foundWishlist);
            //         foundWishlist.products = foundWishlist.products.filter(
            //             product => product !== productID
            //         );
    
            //         foundWishlist.save();
            //         return foundWishlist
            //             .populate({
            //                 path: 'products',
            //                 populate: {
            //                     path: 'sellerID'
            //                 }
            //             })
            //             .populate('user')
            //             .execPopulate()
            //             .then(data => data.toJSON());
            //     }
            // )
        }
    }
}