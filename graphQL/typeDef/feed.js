const { gql } = require('apollo-server');

export default gql`


    extend type Query {
        getFeedPosts : [Post]
        getFeedProducts : [Product]
    }
    
`;