const {gql} = require('apollo-server');
export default gql`    

    input AddProductInput {
        name: String!,
        price: Int!,
        image: String!,
        size : [String] ,
        codAccepted : Boolean ,
        returnAccepted : Boolean ,
        description: String!,
        keywords:[String!]
    }
    
    type AddProductPayload {
        product : Product
    }
    
    input UpdateProductInput {
        productID: ID!,
        name: String,
        price: Int,
        image: String,
        size : [String] ,
        codAccepted : Boolean ,
        returnAccepted : Boolean ,
        description: String!,
        keywords:[String!]   
    }
    
    type UpdateProductPayload {
        product : Product
    }
    


    extend type Query {
        allProducts: [Product],
        Product(id: ID!): Product
    }

    extend type Mutation {
        addProduct(
            input: AddProductInput
        ): AddProductPayload,

        updateProduct(
            input : UpdateProductInput
        ): UpdateProductPayload,

        removeProduct(
            productID: ID!,
        ): Product
    }`;