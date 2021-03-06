import { gql } from 'apollo-boost';

export const GET_AUTH = gql `
    {
        auth @client {
            isAuthenticated ,
            user {
                id ,
                name ,
                shopName,
            }
        }
    }
`;

export const GET_LOGIN_STATUS = gql `
    {
        auth @client {
            isAuthenticated
        }
    }
`;

export const GET_ALL_USERS = gql`
    query {
        allUsers {
            username
            name
            image
            about
            email
            following {
                id
            }
            followers {
                id
            }
            followingShop {
                id
            }
        }
    }
`;

export const GET_ALL_SELLERS = gql `
    query {
        allSellers {
            id
            shopName
            image
            name
            about
        }
    }
`;

export const GET_ALL_ORDERS = gql`
    query {
        allOrders {
            id
            user {
                name
                username
            }
            products {
                product {
                    id
                    name
                    image
                    description
                    seller {
                        id
                        shopName
                        name
                    }
                }
                itemCount
                selectedSize
            }
            discount
            total
            shipping {
                status
                address {
                    address
                    street
                    city
                    state
                    zipcode
                }
            }
            date
            status {
                packed
                shipped
                confirmed
                delivered
            }
            payment {
                status
                mode
            }
        }
    }
`;

export const GET_ALL_PRODUCTS = gql`
    query {
        allProducts {
            id
            name
            image
            description
            price
            sizes
            seller {
                name
                shopName
            }
        }
    }
`;

export const GET_APPROVAL_PRODUCTS = gql`
    query {
        getProductApproval{
            origin {
                id
                name
                price
                image
                seller {
                    name
                    shopName
                }
            }
            id
            approved
            approvalType
            reviewed
        }
    }
`;

export const GET_APPROVAL_SELELRS = gql`
query {
    getSellerApproval{
        origin {
            id
            name
            shopName
            image
            about
        }
        id
        approved
        approvalType
        reviewed
    }
}  
`;

export const HANDLE_APPROVAL = gql`
    mutation($id: ID!, $comment: String!, $approved: Boolean!) {
        handleApproval(
            input: {
                id: $id,
                comment: $comment,
                approved: $approved
            }
        )
    }
`;