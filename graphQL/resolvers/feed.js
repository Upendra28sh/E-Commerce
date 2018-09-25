const User = require('../models/user');
const Post = require('../models/post');
const Feed = require('../models/feed');
const Product = require('../models/product');
const Seller = require('../models/seller');

// TODO : Optimize Query and Sort According to Timestamp
// TODO : Add Support for Infinite Scroll

module.exports = {
    Query: {
        getFeed: (parent, args, context, info) => {

            return User.findOne({_id: context.user.id}).then(foundUser => {

                if (foundUser) {
                    let array1 = foundUser.following;
                    let array2 = foundUser.followers;
                    let array3 = foundUser.followingShop;

                    let searchKeys = array1.concat(array2).concat(array3);
                    // console.log(searchKeys);

                    return Feed.find({
                        key: {"$in": searchKeys}
                    }).populate('origin').sort('-updated_at').then(data => {
                        // console.log(data);
                        data = data.map(item => {
                            item.origin.__typename = item.refString;
                            if (item.refString === 'Product') {
                                console.log("Product Feed");
                                return Seller.populate(item , {'path' : 'origin.seller'})
                            }
                            return item;
                        });
                        return data;
                    });
                }
            });


        },
        getFeedPosts: (parent, args, context, info) => {
            // console.log(context.user);
            return User.findById(context.user.id).then(foundUser => {
                console.log(foundUser);

                return Post.find({
                    user: foundUser.following
                }).populate({
                    path: 'product',
                    populate: {
                        path: 'sellerID'
                    }
                }).populate('user').then(posts => {
                    console.log("Posts From Followers : ", posts);
                    return posts;
                });
            });
        },
        getFeedProducts: (parent, args, context, info) => {
            console.log(context.user);
            return User.findById(context.user.id).then(foundUser => {
                console.log(foundUser);
                return Product.find({
                    sellerID: foundUser.followingShop
                }).populate({
                    path: 'sellerID'
                }).then(products => {
                    console.log(products);
                    return products;
                });
            }).catch(err => {
                console.log(err);
                return [];
            });
        }
    },

};

