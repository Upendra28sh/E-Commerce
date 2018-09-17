import {gql} from 'apollo-boost';

// sellerID = "5b883a829a14eb330b094d8b"

export const CONFIRM_PRODUCT_FROM_ORDER = gql`
    mutation($input : confirmProductFromOrderInput ) {
      confirmProductFromOrder(input : $input) {
        success
      }
    }
`;

export const GET_AUTH = gql`
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

export const GET_LOGIN_STATUS = gql`
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

export const GET_ALL_SELLERS = gql`
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
        getOrdersBySeller {
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
                    price
                }
                status {
                    packed
                    shipped
                    confirmed
                    delivered
                }
                _id
                itemCount
                selectedSize
            }
            discount
            order_number
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
        getProductBySeller {
            id
            name
            image
            description
            price
            sizes
            codAccepted
            returnAccepted
            seller {
                name
                shopName
            }
        }
    }
`;

export const ADD_SELLER = gql`
    mutation($input: SellerInput) {
        addSeller(input: $input) {
            name
            image
            id
            about
            shopName
            address {
                address
                street
                city
                state
                zipcode
            }
            legal {
                pan
                aadhar
                gst
                bank {
                    name
                    accountNumber
                    ifscCode
                }
            }
            policy {
                store
                return
            }
        }
    }
`;

export const ADD_PRODUCT = gql`
    mutation($input: AddProductInput) {
        addProduct(input: $input) {
            product {
                id
            }
        }
    }
`;

export const GET_SELLER_POST = gql`
    query {
        getSellerPostBySeller {
            id
            caption
            image
            comments {
                id
                text
            }
        }
    }
`;

export const GET_SELLER_ADDRESS = gql`
    query {
        getSellerAddress {
            address
            street
            city
            state
            zipcode
        }
    }  
`;