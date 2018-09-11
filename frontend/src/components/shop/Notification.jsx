import React from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import {Row, Col} from 'antd';
import {gql} from 'apollo-boost';
import { GET_USER_NOTIFS } from '../query';

class Notification extends React.Component {
    render() {
        return (
            <Query query={GET_USER_NOTIFS}>
                {({loading, data}) => {
                    if (loading) {
                        return <p>Loading...</p>
                    }
                    data = data.getNotifsByUser;
                    console.log(data);

                    if (data.length == 0) {
                        return <p>No Notification</p>
                    }

                    return (
                        data.map(
                            (notif, index) => {
                                return (
                                    <Row key={index} className="notification">
                                        <Col span={4}>
                                            <img 
                                                src={notif.image}
                                                style={{width: '100%', padding: "0 10px 10px 10px"}}
                                                className="notification__image"
                                            />
                                        </Col>
                                        <Col span={20}>
                                            <Link className="notification__message" to={notif.action}>
                                                <span>{notif.text}</span>
                                            </Link>
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

export default Notification;