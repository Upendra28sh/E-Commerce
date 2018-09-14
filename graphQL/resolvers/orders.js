const Order = require('../models/order');
const Cart = require('../models/cart');
const Address = require('../models/address.js');

function transformToProducts(cart) {
    return cart.items.map(item => {
        return {
            product: item.item ,
            itemCount: item.itemCount,
            selectedSize: item.selectedSize
        }
    })
}


module.exports = {
    Query: {
        allOrders: (parent, args, context, info) => {
            return Order.find({})
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'seller'
                    }
                })
                .populate('user')
                .populate('shipping.address')
                .exec()
                .then(
                    data => data
                );
        },
        Order: (parent, args, context, info) => {
            return Order.findOne({
                _id: args.id
            })
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'seller'
                    }
                })
                .populate('user')
                .populate('shipping.address')
                .exec()
                .then(
                    data => data
                );
        },
        getOrdersByUser: (parent, {userID}, context, info) => {
            return Order.find({
                user: userID
            })
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'seller'
                    }
                })
                .populate('user')
                .populate('shipping.address')
                .exec()
                .then(
                    data => data
                );
        },
        getOrdersBySeller: (parent, args, {seller}, info) => {
            let result = [];
            return Order.find({})
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'seller'
                    }
                })
                .populate('user')
                .populate('shipping.address')
                .exec()
                .then(
                    data => {
                        data.forEach(
                            order => {
                                order.products.forEach(
                                    it => {
                                        if (it.product.seller.id == seller.id) {
                                            result.push(order);
                                            return;
                                        }
                                    }
                                );
                            }
                        );
                    }
                )
                .then(
                    data => {
                        return result;
                    }
                );
        }
    },

    Mutation: {
        addOrder: (parent, {input}, context, info) => {
            return Order.create({
                user: input.userID,
                discount: input.discount,
                total: input.total,
                date: input.date,
                payment: input.payment,
                shipping: {status: null, address: null},
                status: input.status
            }).then(
                createdOrder => {
                    input.products.forEach(function (prod) {
                        createdOrder.products.push(prod);
                    });
                    Address
                        .create(input.shipping.address)
                        .then(
                            createdAddress => {
                                createdAddress.shipping = {
                                    status: input.shipping.status,
                                    address: createdAddress
                                };
                            }
                        );
                    createdOrder.save();
                    return createdOrder
                        .populate({
                            path: 'products.product',
                            populate: {
                                path: 'seller'
                            }
                        })
                        .populate('user')
                        .populate('shipping.address')
                        .execPopulate().then(
                            data => {
                                return {
                                    order: data.toJSON()
                                };
                            }
                        );
                }
            );
        },

        addOrderFromCart: (parent, {input}, context, info) => {
            return Cart.findOne({user: context.user.id}).populate('items.item').then(
                foundCart => {
                    console.log(foundCart);
                    let total = 0 ;
                    foundCart.items.forEach(
                        cartItem => total += cartItem.item.price
                    );
                    let products = transformToProducts(foundCart);
                    console.log(products)

                    return Order.create({
                        user: context.user.id,
                        discount: 0,
                        total: total,
                        products : products,
                        date: new Date().toISOString() ,
                        shipping: {address: input.address},
                    }).then(
                        createdOrder => {
                            return createdOrder
                                .populate({
                                    path: 'products.product',
                                    populate: {
                                        path: 'seller'
                                    }
                                })
                                .populate('user')
                                .execPopulate().then(
                                    data => {
                                        return {
                                            order: data.toJSON()
                                        };
                                    }
                                );
                        }
                    );
                }
            );
        },

        removeOrder: (parent, args, context, info) => {
            return Order.findOneAndDelete({
                _id: args.orderID
            }).populate('products').populate('user').exec().then(
                data => data
            );
        }
    }
};