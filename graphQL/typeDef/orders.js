import gql from 'graphql-tag';

// Changed order model to store product, itemCount and selectedSize instead of only productID.

export default gql`
    extend type Query {
        allOrders: [Order],
        Order(id: ID!): Order
    }

    input AddAddressInput {
        address : String,
        street : String,
        city : String,
        state : String,
        zipcode : Int
    }

    input AddShippingInput {
        status: String,
        address: AddAddressInput
    }
    
    input AddStatusInput {
        confirmed: Boolean,
        packed: Boolean,
        shipped: Boolean,
        delivered: Boolean,
    }

    input AddPaymentInput {
        status: String,
        mode: String
    } 

    input AddOrderInput {
        userID: ID!,
        products: [ID!]!,
        discount: Int,
        total: Int,
        date: Date,
        shipping : AddShippingInput,
        status: AddStatusInput,
        payment: AddPaymentInput
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
