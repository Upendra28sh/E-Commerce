const { gql } = require('apollo-server');

export default gql`

    extend type Query {
        allSellerpost: [Sellerpost]
        getSellerPostBySeller(id : ID) : [Sellerpost]
        getSellerPostByFeed(id : ID) : [FeedType]
    }
        
    extend type Mutation {
        addNewPostSeller(
            file: Upload!,
            caption:String!,
        ) : Boolean       
    }
`;