import {gql} from 'apollo-boost';

// sellerID = "5b883a829a14eb330b094d8b"

export const CONFIRM_PRODUCT_FROM_ORDER = gql`
    mutation($input : confirmProductFromOrderInput ) {
      confirmProductFromOrder(input : $input) {
        success
      }
    }
`;

export const GET_ACTIVE_USER_BY_SELLER = gql`
{
  getActiveUsersLastWeekBySeller {
    users ,
    date
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

// id pas kya hai? teamviewer ka? seller with posts
//iosd wale me hi he post
// samjh gaya

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

export const GET_POST_BY_SELLER = gql`
    query sellerpost($id : ID){
        getSellerPostBySeller(id:$id){
            id
            image
            caption
            updated_at
            seller {
                name
                image
            }
            comments{
                user{
                    name
                    username
                }
                text
            }
        }
    }
`;

export const GET_PRODUCTS_BY_SELLER = gql`
    query getProductsBySeller($id: ID!) {
        getProductBySeller(id: $id) {
            id
            name
            image
            sizes
            keywords
            description
            seller {
                name
            }
        }
    }
`;

export const GET_SELLER = gql`
    query {
        getSeller {
            name
            image
            id
            about
            intro
            shopName
            address {
                address
                street
                city
                state
                zipcode
            }
            policy {
                store
                return
            }
            followers{
                id
            }
        }
    }
`;