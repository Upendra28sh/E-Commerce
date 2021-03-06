import Sellerpost from '../models/sellerpost';
import Feed from '../models/feed';
import Seller from '../models/seller';
import {
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
            if (seller) {
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
        } ,
        getSellerPostByFeed : (parent , args , context , info ) => {
            let seller = args.id ;

            return Feed.find({
                key : seller ,
                refString : 'Sellerpost'
            }).populate('origin').sort('-updated_at').then(data => {
                data = data.map(item => {
                    item.origin.__typename = item.refString;

                    if (item.refString === 'Sellerpost') {
                        console.log("Seller Post Feed");
                        item.origin.liked_by_me = (item.origin.liked_by.indexOf(context.user.id) > -1);
                        return Seller.populate(item, {'path': 'origin.seller'});
                    }
                    return item;
                });
                return data;
            });


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
        }
    }
};