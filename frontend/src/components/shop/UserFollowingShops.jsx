import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { GET_FOLLOW_SELLER } from '../query';

const { Meta } = Card;

class UserPosts extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        let ids = [];
        this.props.ids.forEach(
            idObj => ids.push(idObj.id)
        );
        return (
            <div>
                <Query query={GET_FOLLOW_SELLER} variables={{
                    ids: ids
                }}>
                    {({loading, data}) => {
                        if (loading) {
                            return "Loading";
                        }
                        data = data.getSellers;
                        console.log(data);
                        
                        return (
                            <Row>
                                {data.map(
                                        (seller, index) => {
                                            return (
                                                <Col span={8}>
                                                    <Link to={`/seller/${seller.shopname}`}>
                                                        <Card
                                                            key={index}
                                                            hoverable
                                                            style={{ width: 300 }}
                                                            cover={<img alt={seller.shopname} src={`product_images/${seller.image}`} />}
                                                        >
                                                            <Meta
                                                                title={seller.name}
                                                                description={seller.shopname}
                                                            />
                                                        </Card>            
                                                    </Link>
                                                </Col>
                                            );
                                        }
                                    )
                                }
                            </Row>
                        )
                    }}
                </Query>
            </div>
        );
    }
}

export default UserPosts;