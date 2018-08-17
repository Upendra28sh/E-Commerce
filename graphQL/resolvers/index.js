const mongoose = require('mongoose');
const Product = require('../models/product');
const Seller = require('../models/seller');

const products = require('./products');
const sellers = require('./sellers');
const orders = require('./orders');
const users = require('./users');
const auth = require('./auth');

const resolvers = {
    Query: {
        ...products.Query,
        ...sellers.Query,
        ...orders.Query,
        ...users.Query
    },

    Mutation: {
        ...products.Mutation,
        ...sellers.Mutation,        
        ...orders.Mutation,        
        ...users.Mutation,
        ...auth.Mutation
    }
};

module.exports = resolvers;