const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
    Query: {
        allOrders: (parent, args, context, info) => {
            return Order.find({})
                .populate({
                    path: 'products.product',
                    populate: {
                        path: 'sellerID'
                    }
                })
                .populate('user')
                .exec()
                .then(
                    data => data
                )
        },
        Order: (parent, args, context, info) => {
            return Order.findOne({
                _id: args.id
            })
            .populate({
                path: 'products.product',
                populate: {
                    path: 'sellerID'
                }
            })
            .populate('user')
            .exec()
            .then(
                data => data
            )
        }
    },

    Mutation: {
        addOrder: (parent, {
            input
        }, context, info) => {
            return Order.create({
                user: input.userID,
                discount: input.discount,
                total: input.total,
                date: input.date,
                shipping: input.shipping,
                payment: input.payment,
                status: input.status
            }).then(
                createdOrder => {
                    input.products.forEach(function (prod) {
                        createdOrder.products.push(prod);
                    })
                    createdOrder.save();
                    return createdOrder
                    .populate({
                        path: 'products.product',
                        populate: {
                            path: 'sellerID'
                        }
                    })
                    .populate('user')
                    .execPopulate().then(
                        data => {
                            return {
                                order: data.toJSON()
                            }
                        }
                    )
                }
            )
        },
        removeOrder: (parent, args, context, info) => {
            return Order.findOneAndDelete({
                _id: args.orderID
            }).populate('products').populate('user').exec().then(
                data => data
            );
        }
    }
}