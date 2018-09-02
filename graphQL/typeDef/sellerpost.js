const { gql } = require('apollo-server');

export default gql`
    extend type Query {
        allSellerpost: [Sellerpost]
        SellerPosts(shopname : String!) : [Sellerpost]
    }

    input NewPostSeller {
        sellerID: String!,
        image: String,
        caption: String!
    }

    extend type Mutation {
        addNewPostSeller(
            input: NewPostSeller
        ) : Sellerpost,
        addSellerComment(
            PostID : ID!,
            text : String
        ):Sellerpost,
    }
`;