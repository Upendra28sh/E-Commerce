import {getActiveUsersLastWeek} from "./utils";
import Order from '../models/order';

module.exports = {
    Query: {
        getActiveUsersLastWeekBySeller: (parent, args, context, info) => {
            return getActiveUsersLastWeek().then(data => {
                console.log(data);
                return data;
            });
        },
        getRevenuePerWeekBySeller: (parent, args, context, info) => {

            // TODO : Complete IT

            let date = new Date();
            date.setDate(date.getDate() - 6);
            console.log(date);
            console.log(context.seller.id);

            return Order.find({
                'products.seller': context.seller.id,
                'status.confirmed': true,
                date: {
                    "$gte": date
                }
            }).then(data => {
                return data;
            });
        }
    },
    Mutation: {}
};