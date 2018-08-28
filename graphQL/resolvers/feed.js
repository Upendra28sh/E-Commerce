const User = require('../models/user');
const Post = require('../models/post');

// TODO : Optimize Query and Sort According to Timestamp
// TODO : Add Support for Infinite Scroll

module.exports = {
    Query: {
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
        }
    },
};
