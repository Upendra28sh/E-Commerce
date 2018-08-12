import React from 'react';
import { Card, Row, Col, Avatar, Input } from 'antd';

class ProductDetailsForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{width: '95%', margin: 'auto'}}>
                    <div className="product_header">
                        <h3>Photos</h3>
                        <p>Add as many pictures as you can</p>
                    </div>

                    <Row className="product_pictures">
                        <Col span={6} className="product_pictures__details">
                            <Row>
                                <p style={{marginBottom: 0}}><strong>Photos:</strong></p>
                                Use up to ten photos to show your item's most important qualities.
                            </Row>
                            <br />
                            <strong>Tips:</strong>
                            <ol>
                                <li>Use natural light and no flash.</li>
                                <li>Include a common object for scale.</li>
                                <li>Show the item being held, worn, or used.</li>
                                <li>Shoot against a clean, simple background.</li>
                            </ol>
                        </Col>
                        <Col span={18}>
                            <div className="product_pictures__new">+</div>
                            <div className="product_pictures__new">+</div>
                            <div className="product_pictures__new">+</div>
                            <div className="product_pictures__new">+</div>
                            <div className="product_pictures__new">+</div>
                        </Col>
                    </Row>
                </Card>

                <br />
                
                <Card style={{width: '95%', margin: 'auto'}}>
                    <div className="product_header">
                        <h3>Listing Details</h3>
                        <p>Tell the world all about your item and why they’ll love it.</p>
                    </div>

                    <br />
                    
                    <Row className="product_details">

                        <Row className="product_details__item">
                            <Col className="product_details__label" span={4}>
                                Name
                                <p>Tell the world all about your item and tell them what is great about your product.</p>
                            </Col>
                            <Col span={20} className="product_details__input">
                                <Input />
                            </Col> 
                        </Row>

                        <Row className="product_details__item">
                            <Col className="product_details__label" span={4}>
                                Price
                                <p>Tell the world all about your item and tell them what is great about your product.</p>
                            </Col>
                            <Col span={20} className="product_details__input">
                                <Input />
                            </Col> 
                        </Row>

                        <Row className="product_details__item">
                            <Col className="product_details__label" span={4}>
                                Description
                                <p>Tell the world all about your item and tell them what is great about your product.</p>
                            </Col>
                            <Col span={20} className="product_details__input">
                                <Input />
                            </Col> 
                        </Row>

                        <Row className="product_details__item">
                            <Col className="product_details__label" span={4}>
                                Overview
                                <p>Tell the world all about your item and tell them what is great about your product.</p>
                            </Col>
                            <Col span={20} className="product_details__input">
                                <Input />
                            </Col> 
                        </Row>

                    </Row>

                </Card>
            
            </div>
        );
    }
}

export default ProductDetailsForm;