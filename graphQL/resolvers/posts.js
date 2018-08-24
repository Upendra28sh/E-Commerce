import Post from '../models/post';
import User from '../models/user';

module.exports = {
    Query: {
        getPosts: (parent, args, context, info) => {
            return Post.find()
                .populate({
                    path: 'product',
                    populate: {
                        path: 'sellerID'
                    }
                })
                .populate('user')
                .exec()
                .then(data => {
                    // console.log(data);
                    return data;
                })
        },
        Posts: (parent, { username }, context, info) => {
            return User.findOne({ username: username }).exec().then(
                foundUser => {
                    return Post.find({user: foundUser._id})
                    .populate({
                        path: 'product',
                        populate: {
                            path: 'sellerID'
                        }
                    })
                    .populate('user')
                    .exec()
                    .then(
                        data => {
                            // console.log(data);
                            return data;
                        }
                    )
                }
            )
        }
    },
    Mutation: {
        addPost: (parent, { input }, context, info) => {
            return Post.create({
                product: input.productID,
                user: "5b7ffea577b51d4220dd83f3"
            }).then(
                createdPost => {
                    createdPost.timestamp = Date.now();
                    createdPost.save(); 
                    return createdPost
                        .populate({
                            path: 'product',
                            populate: {
                                path: 'sellerID'
                            }
                        })
                        .populate('user')
                        .execPopulate()
                        .then(
                            data => {
                                // console.log(data);
                                return data;
                            }
                        )
                }
            )
        }
    }
}