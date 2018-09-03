import {
    gql
} from "apollo-boost";


export const USER_SIGNUP = gql`
    mutation($input : AuthInput , $details : UserDetailsInput , $address : AddressInput ) {
        UserSignup(input : $input , details :$details , address :$address  ) {
            token {
                code ,
                content
            }
        }
    }
`;


export const GET_AUTH = gql `
    {
        auth @client {
            isAuthenticated ,
            user {
                id ,
                name ,
                username,
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

export const SET_AUTH = gql `
    mutation setAuth {
        updateAuth @client
    }

`;
export const FOLLOW_USER = gql `
mutation followuser($FollowingID: ID!) {
  followUser( FollowingID: $FollowingID) {
    id
    name
  }
}
`;
export const UNFOLLOW_USER = gql `
mutation unfollowuser($FollowingID: ID!) {
  unFollowUser( FollowingID: $FollowingID) {
    id
    name
  }
}
`;
export const FOLLOW_SHOP = gql `
mutation followshop($FollowingID: ID!) {
  followShop( FollowingID: $FollowingID) {
    id
    name
  }
}
`;
export const UNFOLLOW_SHOP = gql `
mutation unfollowshop($FollowingID: ID!) {
  unFollowShop( FollowingID: $FollowingID) {
    id
    name
  }
}
`;
export const GET_USER = gql `

        query user($username : String!) {
            User(username : $username){
                id
                username
                email
                following{
                  id
                  name
                  followingShop{
                    id
                  }
                }
                followers{
                  id
                  
                }
                followingShop{
                  id
                }
            }
        }
    
`;

export const GET_POST = gql `
    query post($username : String!) {
        Posts(username : $username) {
            id
            product {
              name
              image
              description
              keywords
              seller {
                id
                name
              }
            }
            user {
              username
            }
        }
    }
`;

export const GET_SELLER = gql `
    query getSeller($shopname: String!) {
        Seller (shopname: $shopname) {
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
            followers{
                id
              }
        }
    }
`;

export const GET_PRODUCTS_BY_SELLER = gql `
    query getProductsBySeller($sellerID: ID!) {
        getProductBySeller(sellerID: $sellerID) {
            id
            name
            image
            sizes
            keywords
            description
            seller {
                id
                name
            }
        }
    }
`;

export const REMOVE_FROM_WISHLIST = gql`
    mutation remove($id: ID) {
        removeFromWishlist(productID: $id) {
            id
        }
    }
`;

export const ADD_TO_WISHLIST = gql`
    mutation add($id: ID) {
        addToWishlist(productID: $id) {
            id
        }
    }
`;

export const GET_FOLLOW_SELLER = gql `
    query ($ids: [ID]!){
        getSellers (ids:$ids) {
            id
            name
            image
            about
            shopName
        }
    }
`;

export const GET_POST_BY_SELLER = gql`
    query sellerpost($shopname : String!){
        SellerPosts(shopname:$shopname){
            id
            image
            caption
            comments{
                user{
                    name
                }
                text
            }
        }
    }

`;

export const ADD_SELLER_COMMENT = gql`
    mutation($PostID : ID!,$text : String!){
        addSellerComment(PostID:$PostID,text:$text){
            id
        }
    }
`;