const { gql } = require('apollo-server');

export default gql`

    input AddUserPostInput {
        product : ID!,
        caption: String
    }
    
    extend type Query {
        getUserPosts : [UserPost]
        UserPosts(username: String!) : [UserPost]
    }
    
    extend type Mutation {
        addUserPost(
            input: AddUserPostInput
        ) : UserPost
    }
`;