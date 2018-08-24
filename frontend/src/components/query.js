import {gql} from "apollo-boost";

export const GET_AUTH = gql`
    {
        auth @client {
            isAuthenticated ,
            user {
                name ,
                username
            }
        }
    }
`;

export const SET_AUTH = gql`
    mutation setAuth {
        updateAuth @client
    }

`;

export const GET_USER = gql`

        query user($username : String!) {
            User(username : $username){
                id ,
                name , 
                about ,
                username ,
                image ,
                email
            }
        }
    
`;

export const GET_POST = gql`
    query post($username : String!) {
        Posts(username : $username) {
            id
            product {
              name
              image
              description
              keywords
              sellerID {
                id
                name
              }
            }
            user {
              username
            }
            timestamp
        }
    }
`;

export const GET_SELLER = gql`
    query getSeller($shopname: String!) {
        Seller (shopname: $shopname) {
            name
            image
            id
            about
            shopname
            address {
                address
                street
                city
                state
                zipcode
            }
            legalInfo {
                pan
                aadhar
                gst
                bank
            }
            policy {
                store
                return
            }
        }
    }
`
export const GET_PRODUCTS_BY_SELLER = gql `
    query getProductsBySeller($sellerID: ID!) {
        getProductBySeller(sellerID: $sellerID) {
            id
            name
            image
            sizes
            keywords
            description
            sellerID {
                id
                name
            }
        }
    }
`;