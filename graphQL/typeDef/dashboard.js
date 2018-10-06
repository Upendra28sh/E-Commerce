const {gql} = require('apollo-server');

export default gql`

    type ActiveUserPayload {
        date : String ,
        users : Int
    }

    extend type Query {
        getActiveUsersLastWeekBySeller : [ActiveUserPayload],
        getRevenuePerWeekBySeller : [Order]
    }
`;
