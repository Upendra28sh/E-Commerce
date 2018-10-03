const {
    gql
} = require('apollo-server');
export default gql `    

    input AddProductInput {
        name: String!,
        price: Int!,
        images: [Upload],
        sizes : [String] ,
        codAccepted : Boolean ,
        returnAccepted : Boolean ,
        description: String!,
        keywords:[String],
    }
    
    type AddProductPayload {
        product : Product
    }
    
    input UpdateProductInput {
        productID: ID!,
        name: String,
        price: Int,
        image: String,
        sizes : [String] ,
        codAccepted : Boolean ,
        returnAccepted : Boolean ,
        description: String!,
        keywords:[String!]
    }
    
    type UpdateProductPayload {
        product : Product
    }
    
    input CategoryInput {
        name: String!,
        title: String!
    }

    # TODO : Change AllProducts to Custom Payload for Support with Paginiation and Infinite Scrolling.
    extend type Query {
        allProducts: [Product],
        getProductBySeller(id : ID): [Product],
        Product(id: ID!): Product,
        getProducts(filter : String!): [Seller]
        getProductsByCategory(input: CategoryInput): [Product]
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
    }`
;