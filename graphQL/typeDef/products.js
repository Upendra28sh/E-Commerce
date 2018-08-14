module.exports = {
    Query: `
        allProducts: [Product],
        Product(id: ID!): Product
    `,
    Mutation: `
        addProduct(
            name: String!,
            price: Int!,
            image: String!,
            description: String!,
            sellerID: ID! 
        ): Product,

        updateProduct(
            productID: ID!,
            name: String!,
            price: Int!,
            image: String!,
            description: String!
        ): Product,

        removeProduct(
            productID: ID!,
        ): Product
    `
}