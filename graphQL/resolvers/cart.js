const User = require('../models/user');
const Cart = require('../models/cart');

module.exports = {
    Query: {
        getCart: (parent, {userID}, context, info) => {
            return Cart.findOne({user: userID})
                .populate({
                    path: 'items.item',
                    populate: {
                        path: 'sellerID'
                    }
                })
                .populate('user')
                .exec()
                .then(
                    data => {
                        // console.log(data)
                        return data;
                    }
                );
        }
    },
    Mutation: {
        addToCart: (parent, {input}, context, info) => {

            let {userID, productID, itemCount, selectedSize} = input;

            return Cart.findOne({user: userID}).exec().then(
                foundCart => {
                    if (!foundCart) {
                        return Cart.create({
                            user: userID,
                            items: [{
                                item: productID,
                                itemCount: itemCount,
                                selectedSize: selectedSize
                            }]
                        }).then(
                            createdCart => {
                                return createdCart
                                    .populate({
                                        path: 'items.item',
                                        populate: {
                                            path: 'sellerID'
                                        }
                                    })
                                    .populate('user')
                                    .execPopulate()
                                    .then(data => data.toJSON());
                            }
                        );
                    } else {

                        let itemInCart = false;
                        console.log(productID, itemCount, selectedSize);
                        // let newItems = [];
                        foundCart.items.forEach(item => {
                            if (item.item == productID && item.selectedSize === selectedSize) {
                                itemInCart = true;
                                item.itemCount += itemCount
                                // newItems.push();
                            }
                        });
                        if (!itemInCart) {
                            foundCart.items.push(
                                {
                                    item: productID,
                                    itemCount: itemCount,
                                    selectedSize: selectedSize
                                }
                            );
                        }
                        console.log(foundCart.items);


                        // foundCart.items = newItems;

                        foundCart.save();
                        return foundCart
                            .populate({
                                path: 'items.item',
                                populate: {
                                    path: 'sellerID'
                                }
                            })
                            .populate('user')
                            .execPopulate()
                            .then(data => data.toJSON());
                    }
                }
            );
        },
        removeFromCart: (parent, {input}, context, info) => {
            let {userID, index} = input;

            return Cart.findOne({user: userID}).exec().then(
                foundCart => {
                    foundCart.items.splice(index, 1);
                    foundCart.save();
                    // console.log(foundCart);
                    return foundCart
                        .populate('items.item')
                        .populate('user')
                        .execPopulate()
                        .then(data => data.toJSON());
                }
            );
        }
    }
};