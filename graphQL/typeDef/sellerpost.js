const { gql } = require('apollo-server');

export default gql`

    extend type Query {
        allSellerpost: [Sellerpost]
        getSellerPostBySeller(id : ID) : [Sellerpost]
    }

    
    extend type Mutation {
        addNewPostSeller(
            file: Upload!,
            caption:String!,
        ) : Boolean,
        addSellerComment(
            PostID : ID!,
            text : String
        ):Sellerpost,
    }
`;