const mongoose = require('mongoose');
const Product = require('../models/product');
const Seller = require('../models/seller');

import {
    GraphQLScalarType
} from 'graphql';
import {
    Kind
} from 'graphql/language';

const products = require('./products');
const sellers = require('./sellers');
const orders = require('./orders');
const users = require('./users');
const auth = require('./auth');
const cart = require('./cart');
const post = require('./posts');
import feed from './feed'

const resolvers = {
    Query: {
        ...products.Query,
        ...sellers.Query,
        ...orders.Query,
        ...users.Query,
        ...cart.Query,
        ...post.Query,
        ...feed.Query
    },

    Mutation: {
        ...products.Mutation,
        ...sellers.Mutation,
        ...orders.Mutation,
        ...auth.Mutation,
        ...cart.Mutation,
        ...users.Mutation,
        ...post.Mutation
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