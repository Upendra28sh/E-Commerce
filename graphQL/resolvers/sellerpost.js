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
        addNewPostSeller: (parent, {
            file,
            caption
        }, {
            seller
        }, info) => {
            var image;
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

                            createFeedItem('Seller Post', createdPost.id, createdPost.seller, 'Seller Post is added');
                            return createdPost
                                .populate('seller')
                                .execPopulate()
                                .then(
                                    data => {
                                        createNotificationSellerpost(data);
                                        console.log(data);
                                        return data;
                                    }
                                );
                        }
                    );
                })

            });

        },



        addSellerComment: (parent, args, context, info) => {
            return Sellerpost.findOne({
                _id: args.PostID
            }).exec().then(post => {
                post.comments.push({
                    text: args.text,
                    user: context.user.id
                });
                post.save();
            });
        }
    }
};