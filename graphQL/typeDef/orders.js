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
            shipping: Int!,
            date:Int!,
            PayStatus:String!,
            Total:Int!,
            paymode:String!,
            city:String!,
            Confirmed:Boolean!,
            Packed:Boolean!,
            Shipped:Boolean!,
            Delivered:Boolean!,
        ): Order,

        removeOrder(
            orderID: ID
        ): Order
    `
}