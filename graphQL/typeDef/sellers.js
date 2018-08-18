import {gql} from 'apollo-server';

export default gql`
    extend type Query {
        allSellers: [Seller],
        Seller(id: ID!): Seller,
        getSellers(ids : [ID]): [Seller]
    }

    extend type Mutation {
        addSeller(
            name: String!,
            image: String!,
            about: String!
        ): Seller,

        updateSeller(
            sellerID: ID!,
            name: String!,
            image: String!,
            about: String!
        ): Seller,

        removeSeller(
            sellerID: ID!
        ): Seller
    }
`;
