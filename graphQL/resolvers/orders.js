const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
    Query: {
        allOrders: (parent, args, context, info) => {
            return Order.find({}).populate({
                path: 'products',
                populate: {
                    path: 'seller'
                }
            }).populate('user').exec().then(
                data => data
            )
        },
        Order: (parent, args, context, info) => {
            return Order.findOne({
                _id: args.id
            }).populate({
                path: 'products',
                populate: {
                    path: 'seller'
                }
            }).populate('user').exec().then(
                data => data
            )
        }
    },

    // Change addOrder according to the changes made in model
    // Instead of pushing the productID, an object with productID, selectedSize and itemCount has to be pushed.

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
                    input.products.forEach(function (id) {
                        createdOrder.products.push(id);
                    })
                    createdOrder.save();
                    return createdOrder.populate('products').populate('user').execPopulate().then(
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