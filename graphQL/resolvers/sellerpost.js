import Sellerpost from '../models/sellerpost';
import Seller from '../models/seller';
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
                })
        },
        SellerPosts : (parent, { shopname }, context, info) => {
            return Seller.findOne({ shopname: shopname }).exec().then(
                foundShop => {
                    return Sellerpost.find({seller: foundShop._id})
                    .populate({
                        path: 'Comments.user',
                    })
                    .populate('seller')
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
        addNewPostSeller: (parent, { input }, context, info) => {
            const { sellerID, image, caption } = input;

            return Sellerpost.create({
                type: 'new',
                seller: sellerID,
                caption: caption,
                image: image,
            }).then(
                createdPost => {
                    createdPost.timestamp = Date.now();
                    createdPost.save();

                    return createdPost
                        .populate('seller')
                        .execPopulate()
                        .then(
                            data => {
                                console.log(data);
                                return data;
                            }
                        )
                }
            )
        },

        addSellerComment: (parent, args, context, info) => {
            return Sellerpost.findOne({_id : args.PostID }).exec().then(post=>{
                post.Comments.push({text : args.text,user:context.user.id});
                post.save();
            })
        }   
    }
}