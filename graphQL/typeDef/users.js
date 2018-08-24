const { gql } = require('apollo-server');

export default gql`
    extend type Query {
        allUsers: [User],
        User(username: String!): User
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