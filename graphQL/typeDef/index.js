const mongoose = require('mongoose');
const {gql} = require('apollo-server');
const {merge} = require('lodash');

import productTypeDef from './products';
import sellerTypeDef from './sellers';
import orderTypeDef from './orders';

const users = require('./users');
const auth = require('./auth');

// Token code
// 1 -> Successful signin/signup
// 2 -> Email already registered
// 3 -> Invalid password
// 4 -> Email not registered

const typeDefs = gql`
    type Query {
        ${users.Query},
    }

    type Mutation {
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
        discount: Int,
        total: Int,
        date: Date,
        shipping : ShippingStatus
        status: OrderStatus
        payment: PaymentStatus
    }

    type ShippingStatus {
        status : String
        address : Address
    }

    type Address {
        address : String ,
        street : String ,
        city : String ,
        state : String ,
        zipcode : Int
    }

    type PaymentStatus {
        status : String ,
        mode : String
    }

    type OrderStatus {
        confirmed:Boolean,
        packed:Boolean,
        shipped:Boolean,
        delivered:Boolean,
    }

    type User {
        id: ID,
        name: String,
        image: String,
        about: String,
        email:String,
    }

    type Token {
        code: Int,
        content: String
    }

    scalar Date
`;

module.exports = [typeDefs, productTypeDef, sellerTypeDef, orderTypeDef];