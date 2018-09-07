import Post from '../models/post';
import User from '../models/user';
import {createApprovalRequest,createFeedItem} from "./utils";

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
        addPost: (parent, input, context, info) => {

            let data = input.input;

            return Post.create({
                product: data.productID,
                user: data.userID,
                caption: data.caption
            }).then(
                createdPost => {
                    createdPost.timestamp = Date.now();
                    createFeedItem('User Post',createdPost.id,'User Post is added');
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
        },
        addComment: (parent, args, context, info) => {
            return Post.findOne({_id : args.PostID }).exec().then(post=>{
                post.Comments({text : args.text,user:context.user.id});
                post.save();
            })
        }
    }
}