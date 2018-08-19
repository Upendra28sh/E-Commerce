const { gql } = require('apollo-server');

export default gql`

    input AddToCartInput {
        userID: ID!,
        productID: ID!,
        itemCount: Int!,
        selectedSize: String
    }

    input RemoveFromCartInput {
        userID: ID!,
        index: Int      
    }

    extend type Query {
        getCart(id: ID!) : Cart
    }

    extend type Mutation {
        addToCart(
            input: AddToCartInput
        ) : Cart,

        removeFromCart(
            input: RemoveFromCartInput
        ) : Cart
    }
`;