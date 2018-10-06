import {gql} from 'apollo-server';

export default gql`
    extend type Query {
        allSellers: [Seller],
        Seller(shopName: String!): Seller,
        getSeller: Seller,
        getSellers(ids : [ID]): [Seller],
        checkShopnameAvailability(shopName: String): Boolean,
        getSellerAddress: [Address]
        getTopSellers: [Seller]
    }

    input SellerInput {
        name: String,
        image: Upload,
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
        aadhar_image:Upload,
        pan_image:Upload,
        cancelled_cheque:Upload,
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
