import {gql} from 'apollo-server';

export default gql`
    extend type Query {
        allSellers: [Seller],
        Seller(shopName: String!): Seller,
        getSellers(ids : [ID]): [Seller],
        checkShopnameAvailability(shopName: String): Boolean,
        getSellerAddress: [Address]
    }

    input SellerInput {
        name: String,
        image: String,
        shopName : String,
        password : String,
        about: String,
        intro : String,
        address: AddressInput,
        legal: LegalDetailsInput,
        policy: SellerPolicyInput
    }

    input LegalDetailsInput {
        aadhar: String,
        pan: String,
        gst: String,
        bank: BankDetailsInput
    }
    
    input BankDetailsInput {
        name : String ,
        accountNumber : Int ,
        ifscCode : String 
    }
    
    input SellerPolicyInput {
        store: String!,
        return: String!
    }

    input SellerAuthInput {
        shopName: String!
        password: String!
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

        SellerLogin(
            input: SellerAuthInput
        ) : AuthPayload
        
    }
`;
