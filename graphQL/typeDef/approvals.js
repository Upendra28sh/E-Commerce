import {gql} from 'apollo-server';

export default gql`
    
    type ApprovalProduct {
        id: ID!,
        approvalType: String,
        approved: Boolean,
        reviewed: Boolean,
        comment: String,
        origin: Product
    }

    type ApprovalSeller {
        id: ID!,
        approvalType: String,
        approved: Boolean,
        reviewed: Boolean,
        comment: String,
        origin: Seller
    }

    input ApprovalInput {
        id: ID!,
        comment: String!
    }

    extend type Query {
        getProductApproval: [ApprovalProduct]
        getSellerApproval: [ApprovalSeller]
    }

    #extend type Mutation {
    #    acceptApproval(input: ApprovalInput): 
    #    acceptApproval(input: ApprovalInput): 
    #}
`;