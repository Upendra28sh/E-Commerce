const mongoose = require('mongoose');
const {gql} = require('apollo-server');
const {merge} = require('lodash');

import productTypeDef from './products';
import sellerTypeDef from './sellers';

const orders = require('./orders');
const users = require('./users');
const auth = require('./auth');

// Token code
// 1 -> Successful signin/signup
// 2 -> Email already registered
// 3 -> Invalid password
// 4 -> Email not registered

const typeDefs = gql`
    type Query {
        ${orders.Query},
        ${users.Query},
    }

    type Mutation {
        ${orders.Mutation},
        ${users.Mutation},
        ${auth.Mutation}
    }

    type Product {
        id: ID,
        name: String,
        price: Int,
        image: String,
        size : [String] ,

        codAccepted : Boolean ,
        returnAccepted : Boolean ,

        description: String,

        keywords:[String],
        seller: Seller
    }

    type Seller {
        id: ID,
        name: String,
        image: String,
        about: String
    }

    type Post {
        id: ID,
        user: User,
        product : Product,
        timestamp : String
    }

    type Order {
        id: ID,
        user: User,
        products: [Product],
        shipping: Int,
        discount: Int,
        date:Int,
        Total:Int,
        paymode:String,
        city:String,
        Confirmed:Boolean,
        Packed:Boolean,
        Shipped:Boolean,
        Delivered:Boolean,
        PayStatus:String
    }

    type User {
        id: ID,
        name: String,
        image: String,
        about: String,
        City:String,
        Latest:Int,
        order:Int,
        email:String,
        Contact:String,
        Total:Int
    }

    type Token {
        code: Int,
        content: String
    }
`;

module.exports = [typeDefs, productTypeDef, sellerTypeDef];