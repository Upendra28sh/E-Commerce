module.exports = {
    Query: `
        allSellers: [Seller],
        Seller(id: ID!): Seller,
        getSellers(ids : [ID]): [Seller]
    `,
    Mutation: `
        addSeller(
            name: String!,
            image: String!,
            about: String!
        ): Seller,

        updateSeller(
            sellerID: ID!,
            name: String!,
            image: String!,
            about: String! 
        ): Seller,
        
        removeSeller(
            sellerID: ID!
        ): Seller      
    `
}