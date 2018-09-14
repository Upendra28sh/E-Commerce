import React from 'react';
import {Query, withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import {gql} from 'apollo-boost';
import { GET_USER_NOTIFS } from '../query';

const SET_NOTIF_READ = gql `
    mutation($notifID: ID!) {
        notificationRead(id: $notifID) {
            id
            text
        }
    }
`;

const findIDinObj= (userData, id) => {
    for(let i=0; i<userData.length; i++) {
        if (userData[i].id == id)
            return true;
    }
}

class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (id) => {
        console.log(id);
        this.props.client.mutate({
            mutation: SET_NOTIF_READ,
            variables: {notifID: id}
        }).then(
            data => console.log(data)
        )
    }

    render() {
        return (
            <Query query={GET_USER_NOTIFS}>
                {({loading, data}) => {
                    if (loading) {
                        return <p>Loading...</p>
                    }
                    data = data.getNotifsByUser;
                    const userID = this.props.user.auth.user.id;
                    console.log(data);

                    if (data.length == 0) {
                        return <p>No Notification</p>
                    }

                    return (
                        data.map(
                            (notif, index) => {
                                return (
                                    <Row 
                                        key={index} 
                                        className="notification" 
                                        onClick={() => this.handleClick(notif.id)}
                                        style={{backgroundColor: findIDinObj(notif.readBy, userID) ? '#00000005' : '#fffff', padding: '10px'}}
                                    >
                                        <Col span={4}>
                                            <img 
                                                src={notif.image}
                                                style={{width: '100%', padding: "0 10px 10px 10px", borderRadius: '50%'}}
                                                className="notification__image"
                                            />
                                        </Col>
                                        <Col span={20}>
                                            <Link className="notification__message" to={notif.action}>
                                                <span>{notif.text}</span>
                                            </Link>
                                            {/* <p>{findIDinObj(notif.readBy, userID) ? 'READ' : ''}</p> */}
                                        </Col>
                                    </Row>
                                )
                            }
                        )
                    )
                }}
            </Query>
        )
    }
}

export default withApollo(Notification);