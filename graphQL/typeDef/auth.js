const {gql} = require('apollo-server');

export default gql`

    input AuthInput {
        email: String!,
        password: String!
    }

    input UserDetailsInput {
        name: String!,
        image: String!,
        about: String!
    }

    type AuthPayload {
        token: Token
    }

    extend type Mutation {
        signup(
            input: AuthInput,
            details: UserDetailsInput
        ) : AuthPayload

        login(
            input: AuthInput
        ) : AuthPayload
    }
`;

// Signup and Login both return only token
// For user details, use getUser query with the token