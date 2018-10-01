import Sellerpost from '../models/sellerpost';
import Seller from '../models/seller';
import {
    createApprovalRequest,
    createFeedItem,
    createNotificationSellerpost
} from "./utils";
import {uploadToS3} from '../middlewares/upload';

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
                .populate('comments.user')
                .exec()
                .then(data => {
                    // console.log(data);
                    return data;
                });
        },
        getSellerPostBySeller: (parent, args, {
            seller
        }, info) => {
            let id = args.id;
            if (seller.id) {
                id = seller.id;
            }

            return Sellerpost.find({
                seller: id
            })
                .populate({
                    path: 'comments.user',
                })
                .populate('seller')
                .exec()
                .then(
                    data => {
                        console.log(data.length);
                        return data;
                    }
                );
        }
    },


    Mutation: {
        addNewPostSeller: (parent, {file, caption}, {seller}, info) => {
            let image;
            file.then((data) => {
                const {
                    stream,
                    filename,
                    mimetype,
                    encoding
                } = data;
                uploadToS3(filename, stream).then((dataurl) => {
                    image = dataurl;
                    console.log("caption", caption);
                    seller.id = seller.id || '5b8da01b7fa161041482573d';
                    return Sellerpost.create({
                        seller: seller.id,
                        caption: caption,
                        image: image
                    }).then(
                        createdPost => {
                            createFeedItem('Sellerpost', createdPost.id, createdPost.seller, 'Seller Post is added');
                            return createdPost
                                .populate('seller')
                                .execPopulate()
                                .then(data => {
                                    createNotificationSellerpost(data);
                                    console.log(data);
                                    return data;
                                });
                        }
                    );
                });
            });
        },
        addSellerPostLike: (parent, {input}, context, info) => {
            return Sellerpost.findOne({
                _id: input.post
            }).exec().then(post => {
                if(post.liked_by.indexOf(context.user.id) === -1){
                    post.liked_by.push(context.user.id);
                }
                return post.save().then(data => {
                    console.log(data.liked_by);
                    data.liked_by_me = (data.liked_by.indexOf(context.user.id) > -1);
                    return data;
                });
            });
        },
        removeSellerPostLike: (parent, {input}, context, info) => {
            return Sellerpost.findOne({
                _id: input.post
            }).exec().then(post => {
                let index = post.liked_by.indexOf(context.user.id)
                if(index  > -1){
                    post.liked_by.splice( index , 1)
                }
                return post.save().then(data => {
                    console.log(data.liked_by);
                    data.liked_by_me = (data.liked_by.indexOf(context.user.id) > -1);
                    return data;
                });
            });
        },
        addSellerComment: (parent, {input}, context, info) => {
            return Sellerpost.findOne({
                _id: input.post
            }).exec().then(post => {
                post.comments.push({
                    text: input.comment,
                    user: context.user.id,
                    username: context.user.username,
                    mentions: input.mention
                });
                return post.save().then(data => {
                    data.liked_by_me = (data.liked_by.indexOf(context.user.id) > -1);
                    return data;
                });
            });
        }
    }
};