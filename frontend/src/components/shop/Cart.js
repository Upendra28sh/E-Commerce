import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';

class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    getCartTotal() {
        let total = 0;
        this.props.shopping_cart.map((item, index) => {
            total += item.price;
        });
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
            <div className="bg-grey">
            {console.log(this.props)}
                <div className="container_160">
                    <div className="cart_title">
                        <h2>{this.props.shopping_cart.length} item{this.props.shopping_cart.length > 1 ? 's': ''} in your cart</h2>
                    </div>
                    <div className="cart_content">
                        <Row>
                            <Col span={16} className="left_part">
                                {
                                    this.props.shopping_cart.map((item, index) => {
                                        return(
                                          <div className="item" key={index}>
                                              <Row>
                                                  <Col span={8}>
                                                      <img src={item.image_url} alt={item.name}/>
                                                  </Col>
                                                  <Col span={16}>
                                                      <div className="item_title">
                                                          <Link to={"shop/" + item.id}>
                                                              <span id="name">{item.name}</span>
                                                          </Link>
                                                          <span id="price">₹ {item.price}</span>
                                                      </div>
                                                      <p>{item.description}</p>
                                                  </Col>
                                              </Row>
                                          </div>
                                        );
                                    })
                                }
                            </Col>
                            <Col className="checkout" style={{paddingLeft: '10px'}} span={8}>
                                <div className="total">
                                    <p>Item(s) total</p>
                                    <span>₹ {this.getCartTotal()}</span>
                                </div>
                                <button onClick={this.handleCheckout}>Checkout</button>
                            </Col>
                        </Row>
                    </div>
                    <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                </div>
            </div>
        );
    }
}

const CartContainer = connect(
    state => state,
    actions
)(Cart);

export default CartContainer;
