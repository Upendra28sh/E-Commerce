import { gql } from 'apollo-boost';

// sellerID = "5b883a829a14eb330b094d8b"

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
            shopname
            image
            name
            about
        }
    }
`;

export const GET_ALL_ORDERS = gql`
    query {
        getOrdersBySeller(sellerID: "5b883a829a14eb330b094d8b") {
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
        getProductBySeller(sellerID: "5b883a829a14eb330b094d8b") {
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