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
import sellerpostTypeDef from './sellerpost';
import wishlistTypeDef from './wishlist';
import adminTypeDef from './admin';

// Token code
// 1 -> Successful signin/signup
// 2 -> Email already registered
// 3 -> Invalid password
// 4 -> Email not registered

const typeDefs = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }

    type Comment {
        id: ID,
        text: String,
        user : User
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
        seller: Seller
    }

    type Seller {
        id: ID,
        name: String,
        image: String,
        shopName: String,
        intro : String,
        about: String,
        address: [Address],
        legal: LegalDetails,
        policy: SellerPolicy
        followers : [User]
    }

    type Post {
        id: ID,
        user: User,
        product : Product,
        caption: String,
        comments :[Comment]
    }

    type Sellerpost {
        id: ID,
        seller: Seller,
        caption: String,
        image: String,
        comments :[Comment]
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
        items: [CartItem],
        user: User
    }

    type OrderItem {
        product: Product,
        itemCount: Int,
        selectedSize: String
    }

    type CartItem {
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
        email:String,
        username : String,
        image: String,
        about: String,
        address: [Address],
        following: [User],
        followers: [User],
        followingShop: [Seller]
        UserToken : String
    }
  
    type LegalDetails {
        aadhar: String,
        pan: String,
        gst: String,
        bank: BankDetails
    }
        
    type BankDetails {
        name : String ,
        accountNumber : Int ,
        ifscCode : String
    }
    
    type SellerPolicy {
        store: String,
        return: String
    }

    type Token {
        code: Int,
        content: String
    }

    type Wishlist {
        id: ID,
        user: User,
        products: [Product]
    }

    input AddressInput {
        address: String,
        street: String,
        city: String,
        state: String,
        zipcode: Int
    }

    scalar Date
`;

module.exports = [typeDefs, productTypeDef, sellerTypeDef, orderTypeDef, authTypeDef, userTypeDef, cartTypeDef, postTypeDef, feedTypeDef, sellerpostTypeDef, wishlistTypeDef, adminTypeDef];
