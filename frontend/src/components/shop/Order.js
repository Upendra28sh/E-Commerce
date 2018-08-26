import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import OrderCard from './OrderCard';

const GET_CART = gql`
    query {
        getOrdersByUser(userID:"5b7ffe9577b51d4220dd83f2") {
            user {
                id
                name
            }
            products {
                product {
                    id
                    name
                    price
                    image
                    description
                    sizes
                    sellerID {
                        name
                        image
                    }
                }
                itemCount
                selectedSize
            }
            discount
            total
            shipping {
                address {
                    address
                    street
                    city
                    state
                    zipcode
                }
                status
            }
            status {
                confirmed
                packed
                shipped
                delivered
            }
            payment {
                mode
                status
            }
        }
    }
`;

class Order extends Component {
    render() {
        return (
            <div>
                <Query query={GET_CART}>
                {({loading, data}) => {
                    if (loading) {
                        return <p>Loading...</p>
                    }

                    data = data.getOrdersByUser;
                    console.log(data);
                    
                    return (
                        <div className="bg-grey">
                            <div className="max_width_980">
                                <div className="cart_title">
                                    <h1>Your Orders</h1>
                                </div>
                                {
                                    data.map(
                                        (order, index) => <OrderCard order={order} key={index}/>
                                    )
                                }
                            </div>
                        </div>
                    );
                }}
                </Query>
            </div>
        )
    }
}

export default Order;