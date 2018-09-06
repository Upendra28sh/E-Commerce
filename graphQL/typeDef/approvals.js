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

    extend type Query {
        getProductApproval: [ApprovalProduct]
        getSellerApproval: [ApprovalSeller]
    }
`;