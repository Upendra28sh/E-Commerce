import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Modal, Row, Col, Tabs, Icon, Divider, Button, InputNumber, Alert, Select, Tag} from 'antd';
import * as actions from '../../actions/shop';

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
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {
        console.log(this.props);
        this.props.getDetails(this.props.match.params.id);
    }

    render() {
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
                {console.log(this.context)}
                <div className="details">
                    <Row>
                        <Col span={14}>
                            <div id="image">
                                <img alt="envelope" id="product_image" src={this.props.details.image_url}/>
                            </div>
                        </Col>

                        <Col span={10}>
                            <Row>
                                <Col span={4}>
                                    <img src="/like.svg" id="seller__image" alt="seller_name"/>
                                </Col>
                                <Col span={20} id="seller__name">
                                    Seller Info
                                    <span>This is a one liner</span>
                                </Col>
                            </Row>

                            <div id="detail">
                                <div className='my-2'>
                                    <h2 id="name">{this.props.details.name}</h2>
                                </div>
                                <div  className='my-1'>
                                    <Tag className="detail">Clothes</Tag>
                                    <Tag className="detail">Shirt</Tag>
                                    <Tag className="detail">Envelope</Tag>
                                </div>
                                <div  className='my-2'>
                                    <h2 id="price">₹{this.props.details.price}.00</h2>
                                </div>

                                <div  className='my-2'>
                                    <div>Size: </div>
                                    <Select
                                        style={{width : '100%'}}
                                        // showSearch
                                        placeholder="Select Size"
                                        optionFilterProp="children"
                                    >
                                        <Option value="s">S</Option>
                                        <Option value="m">M</Option>
                                        <Option value="l">L</Option>
                                    </Select>
                                </div>
                                <div  className='my-2'>
                                    <div>Quantity: </div>
                                    <InputNumber style={{width : '100%'}} min={1} max={10} defaultValue={1}/>
                                </div>
                            </div>

                            <div>
                                <h5>Overview</h5>
                                <ul className="overview">
                                    <li>Handmade item</li>
                                    <li>Materials: VATS NOT INCLUDED, SEE ITEM DETAILS</li>
                                    <li>Cash On Delivery Available</li>
                                    <li>Gift message available</li>
                                </ul>
                            </div>

                            <p className='my-1'>
                                Estimated Delivery by - 04/08/2018
                            </p>

                            <Row>
                                <Col span={8}>
                                    <Button type="primary" size="large" onClick={() => this.checkUser()}>Add To
                                        Cart</Button>
                                    {
                                        this.props.empty_fields ?
                                            <p className="message">Please log in or sign up</p> :
                                            <p></p>
                                    }
                                </Col>
                                <Col span={8}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={
                                            (e) => {
                                                if (this.containsObject(this.props.details, this.props.saved)) {
                                                    e.target.innerHTML = "Already Saved";
                                                } else {
                                                    this.props.saved.push(this.props.details);
                                                    e.target.innerHTML = "Saved";
                                                }
                                            }
                                        }
                                    >
                                        Save
                                    </Button>
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" size="large">Share</Button>
                                </Col>
                            </Row>

                        </Col>

                    </Row>
                    <Row>
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

const DetailsContainer = connect(
    state => state,
    actions
)(Details);

export default DetailsContainer;
