import gql from 'graphql-tag';

export default gql`
    extend type Query {
        allOrders: [Order],
        Order(id: ID!): Order,
        getOrdersByUser(userID: ID!): [Order],
        getOrdersBySeller: [Order]
    }

    input AddItemInput {
        product: ID,
        itemCount: Int,
        selectedSize: String
    }

    input AddShippingInput {
        status: String,
        address: AddressInput
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
        products: [AddItemInput]!,
        discount: Int,
        total: Int,
        date: Date,
        shipping : AddShippingInput,
        status: AddStatusInput,
        payment: AddPaymentInput
    }

    input AddOrderFromCartInput {
        address : AddressInput
    }
    
    type AddOrderPayload {
        order : Order
    }
    
    type EncryptedRequestPayload {
        encRequest : String ,
        access_code : String 
    }

    extend type Mutation {
        addOrder(
            input : AddOrderInput
        ): AddOrderPayload,

        addOrderFromCart(
            input: AddOrderFromCartInput
        ) : AddOrderPayload
        
        getEncryptedRequest(
            orderID : ID 
        ) : EncryptedRequestPayload

        removeOrder(
            orderID: ID
        ): Order
    }
`;
