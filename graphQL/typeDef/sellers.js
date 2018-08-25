import {gql} from 'apollo-server';

export default gql`
    extend type Query {
        allSellers: [Seller],
        Seller(shopname: String!): Seller,
        getSellers(ids : [ID]): [Seller],
        checkShopnameAvailability(shopname: String): Boolean
    }

    input SellerInput {
        shopname: String,
        name: String,
        image: String,
        about: String,
        address: AddressInput,
        legalInfo: InfoInput,
        policy: PolicyInput
    }

    input AddressInput {
        address: String,
        street: String,
        city: String,
        state: String,
        zipcode: Int
    }

    input InfoInput {
        aadhar: String,
        pan: String,
        gst: String,
        bank: String
    }

    input PolicyInput {
        store: String!,
        return: String!
    }

    extend type Mutation {
        addSeller(
            input: SellerInput
        ): Seller,

        updateSeller(
            sellerID: ID!,
            input: SellerInput!
        ): Seller,

        removeSeller(
            sellerID: ID!
        ): Seller
    }
`;
