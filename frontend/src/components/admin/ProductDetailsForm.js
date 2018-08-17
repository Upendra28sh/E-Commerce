import React from 'react';
import { Card, Row, Col, Avatar, Input } from 'antd';
import { addProduct } from '../../actions/admin';

class ProductDetailsForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = e.target;
        const obj = {
            name: data["0"].value,
            price: data["1"].value,
            description: data["2"].value,
            image: data["3"].value,
            seller: "5b65ec564299f042002ef1e9"  // Hardcoded seller ID
        };
        addProduct(obj);
        for(let i=0; i<4; i++) {
            data[`${i}`].value = '';
        }
        
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
                        <form onSubmit={this.handleSubmit}>
                            <Row className="product_details__item">
                                <Col className="product_details__label" span={4}>
                                    Name
                                    <p>Tell the world all about your item and tell them what is great about your product.</p>
                                </Col>
                                <Col span={20} className="product_details__input">
                                    <Input name="name"/>
                                </Col> 
                            </Row>

                            <Row className="product_details__item">
                                <Col className="product_details__label" span={4}>
                                    Price
                                    <p>Tell the world all about your item and tell them what is great about your product.</p>
                                </Col>
                                <Col span={20} className="product_details__input">
                                    <Input name="price" type="number"/>
                                </Col> 
                            </Row>

                            <Row className="product_details__item">
                                <Col className="product_details__label" span={4}>
                                    Description
                                    <p>Tell the world all about your item and tell them what is great about your product.</p>
                                </Col>
                                <Col span={20} className="product_details__input">
                                    <Input name="description"/>
                                </Col> 
                            </Row>

                            <Row className="product_details__item">
                                <Col className="product_details__label" span={4}>
                                    Image URL
                                    <p>Tell the world all about your item and tell them what is great about your product.</p>
                                </Col>
                                <Col span={20} className="product_details__input">
                                    <Input name="image"/>
                                </Col> 
                            </Row>
                            <button>
                                Add
                            </button>
                        </form>
                    </Row>
                </Card>

            </div>
        );
    }
}

export default ProductDetailsForm;