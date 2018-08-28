import Sellerpost from '../models/sellerpost';

module.exports = {
    Query: {
        allSellerpost: (parent, args, context, info) => {
            return Sellerpost.find()
                .populate({
                    path: 'product',
                    populate: {
                        path: 'sellerID'
                    }
                })
                .populate('seller')
                .exec()
                .then(data => {
                    // console.log(data);
                    return data;
                })
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

        addSharePostSeller: (parent, { input }, context, info) => {
            const { sellerID, productID, caption } = input;

            return Sellerpost.create({
                type: 'share',
                seller: sellerID,
                product: productID,
                caption: caption
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
        }
    }
}