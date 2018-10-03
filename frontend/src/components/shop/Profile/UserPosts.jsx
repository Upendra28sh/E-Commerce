import React, {Component} from 'react';
import {Query} from 'react-apollo';

import {GET_POST} from '../../query';
import {Link} from "react-router-dom";
import {Card, Col} from "antd";

class UserPosts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                <Query query={GET_POST} variables={{
                    username: this.props.username
                }}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return "Loading";
                        }
                        if (error) {
                            console.log(error);
                        }
                        data = data.UserPosts;
                        console.log("User Posts : ", data);
                        return (
                            data.map(
                                (post, index) => {
                                    return (
                                        <Col span={6} key={index}>
                                            <Link to={`/user/${this.props.username}/product/${post.product.id}`}>
                                                <Card
                                                    key={index}
                                                    hoverable
                                                    cover={<img src={post.product.image}/>}
                                                >
                                                </Card>
                                            </Link>
                                        </Col>

                                    );
                                }
                            )
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default UserPosts;