module.exports = {
    Query: `
        allOrders: [Order],
        Order(id: ID!): Order
    `,
    Mutation: `
        addOrder(
            userID: ID!,
            productIDs: [ID]!,
            discount: Int!,
            shipping: Int!
        ): Order,

        removeOrder(
            orderID: ID
        ): Order
    `
}