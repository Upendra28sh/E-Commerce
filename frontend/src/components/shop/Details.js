import React from 'react';
import {connect} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';
import {Modal, Row, Col, Tabs, Icon, Divider, Button, InputNumber, Alert, Select, Tag} from 'antd';
import {getProducts, getDetails, addToCart} from '../../actions/shop';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    showModal = () => {
        this.setState(() => ({visible: true}));
    };

    handleCancel = () => {
        this.setState(() => ({visible: false}));
        // this.props.history.push('/shop');
        this.props.history.goBack();
    };

    checkUser() {
        if (this.props.token) {
            this.props.addToCart(this.props.details.id, this.props.token);
        } else {
            this.props.emptyFields();
        }
    }

    containsObject(obj, list) {
        // for (let i = 0; i < list.length; i++) {
        //     if (list[i].id === obj.id) {
        //         return i;
        //     }
        // }
        // return -1;
    }

    componentWillMount() {
        // console.log(this.props.products);
        // console.log("Actions : ", actions);

        if (this.props.products.length === 0) {
            console.log("Products Currently Empty");
            this.props.getProducts().then(data => {
                console.log("Success");
                console.log("Fetched Products : ", this.props.products);
                this.props.getDetails(this.props.match.params.id);
            });

        }
        else {
            console.log("Products Already There : ", this.props.products);
            this.props.getDetails(this.props.match.params.id);
        }
    }

    handleSaveClick(e) {
        let index = this.containsObject(this.props.details, this.props.saved);
        console.log(index);
        if (index > -1) {
            e.target.className = "anticon anticon-heart-o";
            this.props.saved.splice(index, 1);
        } else {
            e.target.className = "anticon anticon-heart";
            this.props.saved.push(this.props.details);
        }
    }

    render() {
        console.log("Details : ", this.props.details);
        if (!this.state.visible) {
            return <Redirect to="/"/>;
        }
        return (
            <Modal
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
                width="60%"
                bodyStyle={{height: '800px'}}
                style={{margin: '0 20%'}}
                id="myModal"
            >
                <div className="product">
                    <Row>
                        <Col span={14}>
                            <div className="product__image"
                                 style={{backgroundImage: `url("product_images/${this.props.details.image}")`}}>
                                <div className='product__heart'
                                     onClick={e => this.handleSaveClick(e)}>
                                    {
                                        this.containsObject(this.props.details, this.props.saved) > -1 ?
                                            <Icon type="heart"/> : <Icon type="heart-o"/>
                                    }
                                </div>
                            </div>

                        </Col>
                        <Col span={10}>
                            <Row className='product__seller'>
                                <Col span={4}>
                                    <img src="/like.svg" className='product__seller-image' id="seller__image"
                                         alt="seller_name"/>
                                </Col>
                                <Col span={20} className="product__seller-name">
                                    {this.props.details.seller != undefined ? this.props.details.seller.name : 'undefined'}
                                    <span>{this.props.details.seller != undefined ? this.props.details.seller.about : 'undefined'}</span>
                                </Col>
                            </Row>

                            <div>
                                <div className='my-2'>
                                    <h2 className="product__name">{this.props.details.name}</h2>
                                </div>
                                <div className='my-1'>
                                    <Tag className="detail">Clothes</Tag>
                                    <Tag className="detail">Shirt</Tag>
                                    <Tag className="detail">Envelope</Tag>
                                </div>
                                <div className='my-2'>
                                    <h2 className="product__price">₹{this.props.details.price}.00</h2>
                                </div>

                                <div className='my-2'>
                                    <div>Size:</div>
                                    <Select
                                        style={{width: '100%'}}
                                        // showSearch
                                        placeholder="Select Size"
                                        optionFilterProp="children"
                                    >
                                        <Option value="s">S</Option>
                                        <Option value="m">M</Option>
                                        <Option value="l">L</Option>
                                    </Select>
                                </div>
                                <div className='my-2'>
                                    <div>Quantity:</div>
                                    <InputNumber style={{width: '100%'}} min={1} max={10} defaultValue={1}/>
                                </div>
                            </div>

                            <div>
                                <h5>Overview</h5>
                                <ul className="product__overview">
                                    <li>Handmade item</li>
                                    <li>Materials: See Item Details</li>
                                    <li>Cash On Delivery Available</li>
                                    <li>Gift message available</li>
                                </ul>
                            </div>

                            <p className='my-1'>
                                Estimated Delivery by - 04/08/2018
                            </p>

                            <Row>
                                <Col span={12}>
                                    <Button type="primary" size="large" className="product__add-to-cart"
                                            onClick={() => this.checkUser()}>Add To
                                        Cart</Button>
                                    {
                                        this.props.empty_fields ?
                                            <p className="message">Please log in or sign up</p> :
                                            <p></p>
                                    }
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" size="large" className="product__share">Share</Button>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                    <Row className="information">
                        <Col span={24}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="android"/>Description</span>} key="1">
                                    {this.props.details.description}
                                </TabPane>
                                <TabPane tab={<span><Icon type="apple"/>Envelope</span>} key="2">
                                    envelope dimensions {this.props.details.envelope_dimension}
                                </TabPane>
                                <TabPane tab={<span><Icon type="android"/>Card</span>} key="3">
                                    card dimensions {this.props.details.card_dimension}
                                </TabPane>
                                <TabPane tab={<span><Icon type="android"/>Made In</span>} key="4">
                                    made in the U.S.A
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Modal>

        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        details: state.details
    };
}

const DetailsContainer = connect(mapStateToProps, {
    getDetails,
    getProducts,
    addToCart
})(Details);

export default DetailsContainer;
