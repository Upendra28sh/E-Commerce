import { gql } from 'apollo-server';

export default gql`
    extend type Query {
        allNotifs: [Notification]
        getNotifsByUser: [Notification]
    }
`;