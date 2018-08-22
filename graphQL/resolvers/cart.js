const User = require('../models/user');
const Cart = require('../models/cart');

module.exports = {
    Query: {
        getCart: (parent, { userID }, context, info) => {
            return Cart.findOne({user: userID})
                .populate('items.item')
                .populate('user')
                .exec()
                .then(
                    data => {
                        console.log(data)
                        return data;
                    }
                )
        }
    },   
    Mutation: {
        addToCart: (parent, { input }, context, info) => {

            let { userID, productID, itemCount, selectedSize } = input;

            return Cart.findOne({user: userID}).exec().then(
                foundCart => {
                    if (!foundCart) {
                        return Cart.create({
                            user: userID,
                        }).then(
                            createdCart => {
                                createdCart.items.push(
                                    {
                                        item: productID,
                                        itemCount: itemCount,
                                        selectedSize: selectedSize
                                    }
                                );
                                createdCart.save();
                                return createdCart
                                    .populate('items.item')
                                    .populate('user')
                                    .execPopulate()
                                    .then(data => data.toJSON())
                            }
                        )
                    } else {
                        foundCart.items.push(
                            {
                                item: productID,
                                itemCount: itemCount,
                                selectedSize: selectedSize
                            }
                        );
                        foundCart.save();
                        return foundCart
                            .populate('items.item')
                            .populate('user')
                            .execPopulate()
                            .then(data => data.toJSON())
                    }
                }
            )
        },
        removeFromCart: (parent, { input }, context, info) => {
            let { userID, index } = input;

            return Cart.findOne({user: userID}).exec().then(
                foundCart => {
                    foundCart.items.splice(index, 1);
                    foundCart.save();
                    console.log(foundCart);
                    return foundCart
                        .populate('items.item')
                        .populate('user')
                        .execPopulate()
                        .then(data => data.toJSON())
                }
            );
        }
    }
}