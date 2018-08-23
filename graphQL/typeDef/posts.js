const { gql } = require('apollo-server');

export default gql`

    input AddPostInput {
        productID : ID!
    }
    
    extend type Query {
        getPosts() : [Post]
    }

    extend type Mutation {
        addPost(
            input: AddPostInput
        ) : Cart,
    }
`;