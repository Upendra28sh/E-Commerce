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

    Mutation: {
        addOrder: (parent, args, context, info) => {
            return Order.create({
                discount: args.discount,
                shipping: args.shipping,
                user: args.userID,
                date:args.date,
                PayStatus:args.PayStatus,
                Total:args.Total,
                paymode:args.paymode,
                city:args.city,
                Confirmed:args.Confirmed,
                Packed:args.Packed,
                Shipped:args.Shipped,
                Delivered:args.Delivered,
                
            }).then(
                createdOrder => {
                    args.productIDs.forEach(function (id) {
                        createdOrder.products.push(id);
                    })
                    createdOrder.save();
                    return createdOrder.populate('products').populate('user').execPopulate().then(
                        data => data
                    );
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