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
    
`