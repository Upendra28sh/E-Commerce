const { gql } = require('apollo-server');

export default gql`
    extend type Query {
        allSellerpost: [Sellerpost]
    }

    input NewPostSeller {
        sellerID: String!,
        image: String,
        caption: String!
    }

    extend type Mutation {
        addNewPostSeller(
            input: NewPostSeller
        ) : Sellerpost
    }
`;