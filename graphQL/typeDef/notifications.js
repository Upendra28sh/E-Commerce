import { gql } from 'apollo-server';

export default gql`
    extend type Query {
        allNotifs: [Notification]
        getNotifsByUser: [Notification]
    }

    extend type Mutation {
        notificationRead(id: ID): Notification
        makeChatNotify(to:String):Boolean
    }
`;