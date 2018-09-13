import {gql} from 'apollo-server';

module.exports = gql`

    input FBInput {
        accessToken: String!,
        userID: String!,
    }

    extend type Mutation {
        fbSignup(
            input: FBInput
        ): AuthPayload
        fbSignin(
            input: FBInput
        ): AuthPayload
    }
`;