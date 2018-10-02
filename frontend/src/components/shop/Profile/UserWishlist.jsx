import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Card} from 'antd';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const {Meta} = Card;

const GET_WISHLIST = gql`
    query($user : ID) {
        showWishlist(user : $user) {
            user {
                name
                username
                id
            }
            products {
                id
                name
                image
                price
                description
                seller {
                    id
                    name
                    image
                    about
                }
            }
        }
    }
`;

class UserWishlist extends React.Component {

    render() {
        return (
            <Query query={GET_WISHLIST} variables={{user: this.props.user}}>
                {({loading, error, data}) => {
                    console.log(loading, error, data);

                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    data = data.showWishlist;

                    if (!data || data.products.length === 0) return (
                        <div className="bg-grey">
                            <div style={{textAlign : 'center'}}>
                                <div className="cart_title">
                                    <h2>Wishlist Empty</h2>
                                </div>
                            </div>
                        </div>
                    );
                    console.log(data);

                    return (

                        <div className="bg-grey">
                            <Row gutter={16}>
                                {
                                    data.products.map((product, index) => {
                                        return (
                                            <Col span={6} key={index}>
                                                <Link to={`/user/${data.user.username}/product/${product.id}`}>
                                                    <Card
                                                        key={index}
                                                        hoverable
                                                        cover={<img alt={product.name} src={product.image}/>}
                                                    >
                                                        <Meta
                                                            title={product.name}
                                                            description={product.seller.name}
                                                        />
                                                    </Card>
                                                </Link>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>

                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default UserWishlist;
