const mongoose = require('mongoose');
const {gql} = require('apollo-server');

const products = require('./products');
const sellers = require('./sellers');
const orders = require('./orders');
const users = require('./users');

const typeDefs = gql`
    type Query {
        ${products.Query},
        ${sellers.Query},
        ${orders.Query},
        ${users.Query}
    }

    type Mutation {
        ${products.Mutation},
        ${sellers.Mutation},
        ${orders.Mutation},
        ${users.Mutation}
    }

    type Product {
        id: ID,
        name: String,
        price: Int,
        image: String,
        description: String,
        seller: Seller
    }

    type Seller {
        id: ID,
        name: String,
        image: String,
        about: String
    }

    type Order {
        id: ID,
        user: User,
        products: [Product],
        shipping: Int,
        discount: Int
    }

    type User {
        id: ID,
        name: String,
        image: String,
        about: String
    }
`;

module.exports = typeDefs;