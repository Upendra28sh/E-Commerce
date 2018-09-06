import {gql} from 'apollo-server';

export default gql `
    extend type Query {
        showWishlist(user : ID): Wishlist,
        checkInWishlist(productID: ID): Boolean
    }

    extend type Mutation {
        addToWishlist(productID: ID): Wishlist,
        removeFromWishlist(productID: ID): Wishlist 
    }
`;