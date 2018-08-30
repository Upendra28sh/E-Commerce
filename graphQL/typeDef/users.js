const {
    gql
} = require('apollo-server');

//getFeedProducts(username: String!): [Product]

export default gql `
    extend type Query {
        allUsers: [User],
        User(username: String!): User,
         
    }
    extend type Mutation {
        followUser(
            FollowingID : ID!
        ): User,
        unFollowUser(
            FollowingID : ID!
        ): User,
        followShop(
            FollowingID : ID!
        ): Seller,
        unFollowShop(
            FollowingID : ID!
        ): Seller
    }
`

// module.exports = {
//     Query: `
//         
//     `,
//     Mutation: `
//         addUser(
//             name: String,
//             image: String,
//             about: String,
//             order:Int,
//             City:String,
//             email:String,
//             Latest:Int,
//             Contact:String,
//             Total:Int
//         ): User
//     `
// }