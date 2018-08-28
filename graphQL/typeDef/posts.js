const { gql } = require('apollo-server');

export default gql`

    input AddPostInput {
        productID : ID!,
        caption: String!
    }
    
    extend type Query {
        getPosts : [Post]
        Posts(username: String!) : [Post]
    }

    extend type Mutation {
        addPost(
            input: AddPostInput
        ) : Post,
    }
`;