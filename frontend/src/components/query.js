import {gql} from "apollo-boost";

export const GET_ENC_REQUEST = gql`
    mutation($orderID : ID) {
        getEncryptedRequest(orderID: $orderID) {
            encRequest ,
            access_code
        }
    }
`

export const GET_USER_ADDRESS = gql`
    {
        getUserAddresses {
            address
            zipcode
            state
            street
            city
        }
    }
`;

export const GET_CART = gql`
    {
        getCart {
            id
            items {
                itemCount
                selectedSize
                item {
                    id
                    name
                    price
                    image
                    description
                    seller {
                        id ,
                        image ,
                        name
                    }
                }
            }
        }
    }
`;


export const ADD_ORDER_CART = gql `
mutation($input : AddOrderFromCartInput) {
  addOrderFromCart(input : $input) {
    order {
        id
        order_number
        discount
        total
        shipping {
          status
          address {
            address
            street
            state
            city
            zipcode
          }
        }
        status {
          confirmed
          packed
          shipped
          delivered
        }
        products {
          product {
            id
            name
            price
            seller {
              id
              name
              image
            }
          } ,
          itemCount ,
          selectedSize
        }
    }
  }
}`;


export const GET_USER_FEED = gql`
    {
        getFeed {
            refString ,
            origin {
                ...on Post {
                    caption ,
                    product {
                        name ,
                        price ,
                        sizes
                    }
                }
                ...on Sellerpost {
                    caption ,
                    image ,
                    seller {
                        name ,
                        image
                    }
                }
                ...on Product {
                    name ,
                    image ,
                    sizes ,
                    price
                    description ,
                    codAccepted ,
                    returnAccepted
                    seller {
                        name ,
                        image
                    }
                }
            },
            created_at ,
            updated_at ,
            event

        }
    }
`;

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
                name
                about
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
    query getSeller($shopName: String!) {
        Seller (shopName: $shopName) {
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

export const GET_PRODUCTS_BY_SELLER = gql `
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

export const ADD_SELLER_COMMENT = gql`
    mutation($PostID : ID!,$text : String!){
        addSellerComment(PostID:$PostID,text:$text){
            id
        }
    }
`;

export const GET_ALL_SELLERS = gql`
    query {
        allSellers{
            id
            name
            intro
            about
            image
            shopName
        }
    }
`;

export const FB_SIGNUP = gql`
    mutation($input: FBInput) {
        fbSignup(input: $input) {
            token {
                code
                content
            }
        }
    }
`;

export const FB_SIGNIN = gql`
    mutation($input: FBInput) {
        fbSignin(input: $input) {
            token {
                code
                content
            }
        }
    }
`;

export const GET_USER_NOTIFS = gql `
    query {
        getNotifsByUser {
            id
            image
            text
            action
            to {
                name
                username
            }
            readBy {
                id
                name
                username
            }
        }
    }
`;
export const ADD_POST = gql`
mutation($file:Upload!){
    addNewPostSeller(file:$file)
  }`