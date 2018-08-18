import gql from 'graphql-tag';

export default gql`
    extend type Query {
        allOrders: [Order],
        Order(id: ID!): Order
    }

    input AddOrderInput {
        products : [ID!]! ,
        coupon : String ,
    }

    type AddOrderPayload {
        order : Order
    }

    extend type Mutation {
        addOrder(
            input : AddOrderInput
        ): AddOrderPayload,

        removeOrder(
            orderID: ID
        ): Order
    }
`;
