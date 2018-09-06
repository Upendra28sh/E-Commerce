const { gql } = require('apollo-server');

export default gql`
    extend type Query {
        allSellerpost: [Sellerpost]
        getSellerPostBySeller(id : ID!) : [Sellerpost]
    }

    input NewPostSeller {
        image: String!,
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