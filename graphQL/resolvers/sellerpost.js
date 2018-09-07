import Sellerpost from '../models/sellerpost';
import Seller from '../models/seller';
import {createApprovalRequest,createFeedItem} from "./utils";

module.exports = {
    Query: {
        allSellerpost: (parent, args, context, info) => {
            return Sellerpost.find()
                .populate({
                    path: 'product',
                    populate: {
                        path: 'seller'
                    }
                })
                .populate('seller')
                .exec()
                .then(data => {
                    // console.log(data);
                    return data;
                });
        },
        getSellerPostBySeller: (parent, {id}, context, info) => {
            return Sellerpost.find({seller: id})
                .populate({
                    path: 'comments.user',
                })
                .populate('seller')
                .exec()
                .then(
                    data => {
                        // console.log(data);
                        return data;
                    }
                );
        }
    },


    Mutation: {
        addNewPostSeller: (parent, {input}, {seller}, info) => {
            const {image, caption} = input;

            return Sellerpost.create({
                seller: seller.id,
                caption: caption,
                image: image,
            }).then(
                createdPost => {
                    createFeedItem('Seller Post',createdPost.id, createdPost.seller  , 'Seller Post is added');
                    return createdPost
                        .populate('seller')
                        .execPopulate()
                        .then(
                            data => {
                                console.log(data);
                                return data;
                            }
                        );
                }
            );
        },

        addSellerComment: (parent, args, context, info) => {
            return Sellerpost.findOne({_id: args.PostID}).exec().then(post => {
                post.comments.push({text: args.text, user: context.user.id});
                post.save();
            });
        }
    }
};