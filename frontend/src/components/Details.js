import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal, Row, Col, Tabs, Icon, Divider, Button } from 'antd';
import * as actions from '../actions/home';

const TabPane = Tabs.TabPane;

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    showModal = () => {
        this.setState(() => ({ visible: true }));
    }
    
    handleCancel = () => {
        this.setState(() => ({ visible: false }));
        // this.props.history.push('/shop');
        this.props.history.goBack();
    }

    checkUser() {
        if (this.props.token) {
            this.props.addToCart(this.props.details.id, this.props.token);
        } else {
            this.props.emptyFields();
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.props.getDetails(this.props.match.params.id);
    }

    render() {
        if(!this.state.visible) {
            return <Redirect to="/"/>
        } 
        return (
            <Modal
                visible={this.state.visible}
                footer={null}
                onCancel={this.handleCancel}
                width="auto"
                bodyStyle={{height: '800px'}}
                style={{margin: '0 10% 0 10%'}}
                id="myModal"
            >
                {console.log(this.context)}
                <div className="details">
                    <Row>
                        <Col span={10}>
                            <div id="image">
                                <img alt="envelope" id="product_image" src={this.props.details.image_url}></img>
                            </div>
                        </Col>

                        <Col span={14}>
                            <Row>
                                <Col span={4} >
                                    <img src="/like.svg" id="seller__image" />
                                </Col>
                                <Col span={20} id="seller__name">Seller Info</Col>
                            </Row>
                        
                            <Row>
                                <Col span={24}>
                                    <h2 id="name">{this.props.details.name}</h2>
                                    <h2 id="price">${this.props.details.price}.00</h2>
                                </Col>
                            </Row>
                        
                            <Row>
                                <Col span={8}>
                                    <Button type="primary" size="large" onClick={()=> this.checkUser()}>Add To Cart</Button>                                
                                    {
                                        this.props.empty_fields?
                                        <p className="message">Please log in or sign up</p> :
                                        <p></p>
                                    }
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" size="large">Save</Button>
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" size="large">Share</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={24}>
                                    <p>
                                       Laborum mollit ullamco magna consequat. Laboris ipsum quis nostrud pariatur amet eiusmod officia culpa deserunt pariatur. In culpa fugiat culpa irure elit sunt sit nulla do irure. Pariatur Lorem enim tempor adipisicing nulla pariatur. 
                                    </p>
                                </Col>
                            </Row>
                            
                        </Col>
                
                    </Row>
                    <Divider />
                    <Row>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="android" />Description</span>} key="1">
                                    {this.props.details.description}
                                </TabPane>
                                <TabPane tab={<span><Icon type="apple" />Envelope</span>} key="2">
                                    envelope dimensions {this.props.details.envelope_dimension}
                                </TabPane>
                                <TabPane tab={<span><Icon type="android" />Card</span>} key="3">
                                    card dimensions {this.props.details.card_dimension}
                                </TabPane>
                                <TabPane tab={<span><Icon type="android" />Made In</span>} key="4">
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
