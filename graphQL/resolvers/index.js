import mongoose from'mongoose';
import Product from'../models/product';
import Seller from'../models/seller';

import {
    GraphQLScalarType
} from 'graphql';
import {
    Kind
} from 'graphql/language';

import products from'./products';
import sellers from'./sellers';
import orders from'./orders';
import users from'./users';
import auth from'./auth';
import cart from'./cart';
import post from'./posts';
import feed from './feed'
import sellerpost from './sellerpost';
import wishlist from './wishlist';
import admin from './admin';
import approval from './approvals';
import notification from './notifications';

const resolvers = {
    Query: {
        ...products.Query,
        ...sellers.Query,
        ...orders.Query,
        ...users.Query,
        ...cart.Query,
        ...post.Query,
        ...feed.Query,
        ...sellerpost.Query,
        ...wishlist.Query,
        ...approval.Query,
        ...notification.Query
    },

    Mutation: {
        ...products.Mutation,
        ...sellers.Mutation,
        ...orders.Mutation,
        ...auth.Mutation,
        ...cart.Mutation,
        ...users.Mutation,
        ...post.Mutation,
        ...sellerpost.Mutation,
        ...wishlist.Mutation,
        ...admin.Mutation,
        ...approval.Mutation
    },

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value) // ast value is always in string format
            }
            return null;
        },
    }),
};

module.exports = resolvers;