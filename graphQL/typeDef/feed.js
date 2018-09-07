const { gql } = require('apollo-server');

export default gql`

    union FeedOrigin = Post | Product | Sellerpost
    
    type FeedType {
        origin : FeedOrigin ,
        refString : String ,
        created_at : String ,
        updated_at : String ,
        event : String 
    }
    
    
    extend type Query {
        getFeed : [FeedType]
        getFeedPosts : [Post]
        getFeedProducts : [Product]
    }
    
`;