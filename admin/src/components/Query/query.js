import { gql } from 'apollo-boost';

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
                    sellerID {
                        id
                        shopname
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
            sellerID {
                name
                shopname
            }
        }
    }
`;