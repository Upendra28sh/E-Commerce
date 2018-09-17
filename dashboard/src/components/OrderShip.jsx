import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'antd';
import { Query, withApollo } from 'react-apollo';
import { GET_SELLER_ADDRESS } from './Query/query';

class OrderShip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: 0,
            addresses: [],
            order: undefined
        }
        this.handleAddressSelect = this.handleAddressSelect.bind(this);
    }

    componentWillMount() {
        // console.log(this.props);
        this.props.client.query({
            query:  GET_SELLER_ADDRESS,
        }).then(
            data => {
                // console.log(data);
                this.setState({addresses: data.data.getSellerAddress, order: this.props.location.state.order});
            }
        )
    }
    
    handleAddressSelect(e, index) {
        this.setState({ selectedAddress: index });
    }

    setSelectedClass(index) {
        return index === this.state.selectedAddress ? 'solid 1px black' : 'none';
    }

    render() {
        console.log(this.state);

        if (this.state.order) 
            return (
                <div>
                    <Row>
                        {this.state.addresses.map(
                            (address, index) => {
                                return (
                                    <Col span={8} key={index} onClick={(e) => this.handleAddressSelect(e,index)}>
                                        <Card style={{fontSize: '20px', marginRight: '10px', cursor: 'pointer', border: this.setSelectedClass(index)}}>
                                            <div style={{fontSize: '24px'}}><strong>Address {index+1}</strong></div>
                                            <div>
                                                {address.address}, {address.street},
                                                <br />
                                                {address.city}, {address.state}, {address.zipcode}
                                            </div>
                                        </Card>
                                    </Col>
                                )
                            }
                        )}
                    </Row>
                    <br />
                    <Row>
                        <Col span={4} className='text-center'>
                            <img className='img-fluid'
                                src={`${this.state.order.product.product.image}`}
                                alt={this.state.order.product.product.name}/>
                        </Col>
                        <Col span={2}/>
                        <Col span={9}>
                            <Link to={'/product/' + this.state.order.product.product.id}>{this.state.order.product.product.name}</Link>
                            {this.state.order.product.selectedSize !== "undefined" && (
                                <div>
                                    <small>Size : {this.state.order.product.selectedSize}</small>
                                </div>
                            )}
                            <div>
                                <small>Quantity : {this.state.order.product.itemCount}</small>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div>Rs. {this.state.order.product.product.price}</div>
                        </Col>
                    </Row>
                    <br />
                    <Button>Generate Shipping Label</Button>
                </div>
            )
        return <p>Loading...</p>
    }
}

export default withApollo(OrderShip);