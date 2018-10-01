const { gql } = require('apollo-server');

export default gql`

    extend type Query {
        allSellerpost: [Sellerpost]
        getSellerPostBySeller(id : ID) : [Sellerpost]
    }
    
    input addCommentInput {
        post : ID! ,
        comment : String! ,
        mentions : [String]
    }
    
    input addLikeInput {
        post : ID! 
    }
    input removeLikeInput {
        post : ID!
    }
    
    extend type Mutation {
        addNewPostSeller(
            file: Upload!,
            caption:String!,
        ) : Boolean,
        addSellerComment(
            input : addCommentInput
        ):Sellerpost,
        addSellerPostLike(
            input : addLikeInput
        ):Sellerpost,
        removeSellerPostLike(
            input : removeLikeInput
        ):Sellerpost,
        
    }
`;