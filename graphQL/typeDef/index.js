const mongoose = require('mongoose');
import {gql} from 'apollo-server';
import {merge} from 'lodash';

import productTypeDef from './products';
import sellerTypeDef from './sellers';
import orderTypeDef from './orders';
import authTypeDef from './auth';
import userTypeDef from './users';
import cartTypeDef from './cart';
import postTypeDef from './posts';
import feedTypeDef from './feed';

// Token code
// 1 -> Successful signin/signup
// 2 -> Email already registered
// 3 -> Invalid password
// 4 -> Email not registered

const typeDefs = gql `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Product {
        id: ID,
        name: String,
        price: Int,
        image: String,
        sizes : [String] ,
        codAccepted : Boolean ,
        returnAccepted : Boolean ,
        description: String,
        keywords:[String],
        sellerID: Seller,
        followers : [User]
    }

    type Seller {
        id: ID,
        name: String,
        image: String,
        about: String,
        shopname: String,
        address: Address,
        legalInfo: LegalInfo,
        policy: SellerPolicy
        followers : [User]
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
        products: [OrderItem],
        discount: Int,
        total: Int,
        date: Date,
        shipping : ShippingStatus,
        status: OrderStatus,
        payment: PaymentStatus
    }

    type Cart {
        id: ID,
        items: [Item],
        user: User
    }

    type OrderItem {
        product: Product,
        itemCount: Int,
        selectedSize: String
    }

    type Item {
        item: Product,
        itemCount: Int,
        selectedSize: String
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
        username : String,
        image: String,
        about: String,
        email:String,
        password: String,
        following: [User],
        followers: [User],
        followingShop: [Seller]
    }

    type LegalInfo {
        aadhar: String,
        pan: String,
        gst: String,
        bank: String
    }

    type SellerPolicy {
        store: String,
        return: String
    }

    type Token {
        code: Int,
        content: String
    }

    scalar Date
`;

module.exports = [typeDefs, productTypeDef, sellerTypeDef, orderTypeDef, authTypeDef, userTypeDef, cartTypeDef, postTypeDef, feedTypeDef];