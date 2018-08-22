import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_CART = gql`
    {
        getCart(
            userID:"5b79495957b3413063e7be4c"
        ) {
            id
            items {
                itemCount
                selectedSize
                item {
                    id
                    name
                    price
                    image
                    description
                }
            }
        }
    }
`;

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    getCartTotal(data) {
        let total = 0;
        data.items.map(
            cartItem => total+= cartItem.item.price
        )
        return total;
    }

    handleCheckout() {
        this.props.history.push('/checkout');
    }

    // componentDidMount() {
    //     this.props.getCart(this.props.token);
    // }

    render() {
        return (
            <Query query={GET_CART}>
                {({loading, error, data}) => {
                    console.log(loading, error, data);
                    
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    
                    data = data.getCart;

                    if (!data) return (
                        <div className="bg-grey">
                            <div className="container_160">
                                <div className="cart_title">
                                    <h2>Cart Empty</h2>
                                </div>
                            </div>
                        </div>
                    )
                    console.log(data);

                    return (
                        <div className="bg-grey">
                            <div className="container_160">
                                <div className="cart_title">
                                    <h2>{data.items.length} item{data.items.length > 1 ? 's': ''} in your cart</h2>
                                </div>
                                <div className="cart_content">
                                    <Row>
                                        <Col span={16} className="left_part">
                                            {
                                                data.items.map((cartItem, index) => {
                                                    return(
                                                      <div className="item" key={index}>
                                                          <Row>
                                                              <Col span={8}>
                                                                  <img src={`product_images/${cartItem.item.image}`} alt={cartItem.item.name}/>
                                                              </Col>
                                                              <Col span={16}>
                                                                  <div className="item_title">
                                                                      <Link to={"shop/" + cartItem.item.id}>
                                                                          <span id="name">{cartItem.item.name}</span>
                                                                      </Link>
                                                                      <span id="price">₹ {cartItem.item.price}</span>
                                                                  </div>
                                                                  <p>{cartItem.item.description}</p>
                                                              </Col>
                                                          </Row>
                                                          <p>Selected Size : {cartItem.selectedSize}</p>
                                                          <p>Item Count : {cartItem.itemCount}</p>
                                                      </div>
                                                    );
                                                })
                                            }
                                        </Col>
                                        <Col className="checkout" style={{paddingLeft: '10px'}} span={8}>
                                            <div className="total">
                                                <p>Item(s) total</p>
                                                <span>₹ {this.getCartTotal(data)}</span>
                                            </div>
                                            <button onClick={this.handleCheckout}>Checkout</button>
                                        </Col>
                                    </Row>
                                </div>
                                <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                            </div>
                        </div>
                    );
                }}
            </Query>

        );
    }
}

// const CartContainer = connect(
//     state => state,
//     actions
// )(Cart);

export default Cart;
