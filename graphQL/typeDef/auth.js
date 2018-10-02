const {gql} = require('apollo-server');

export default gql`

    input AuthInput {
        email: String!
        password: String!
    }

    input NewUserInput {
        email: String!
        password: String!
        username: String!
    }

    input UserDetailsInput {
        name: String!,
        image: String!,
        about: String!,
    }

    type AuthPayload {
        token: Token
    }

    extend type Mutation {
        UserSignup(
            input: NewUserInput,
            details: UserDetailsInput,
            address: AddressInput
        ) : AuthPayload

        UserLogin(
            input: AuthInput
        ) : AuthPayload
        
        CreateUser(
            input: NewUserInput
        ) : AuthPayload
        
        CompleteSignup(
            details: UserDetailsInput,
            address: AddressInput,
            following: [ID]!
        ) : AuthPayload
    }
`;

// Signup and Login both return only token
// For user details, use getUser query with the token