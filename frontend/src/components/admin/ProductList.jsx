import React, {Component} from 'react';
import {Card, Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import ProductCard from "./ProductCard";


class ProductList extends Component {

    render() {
        return (
            <div>
                <h2>Seller Listings <Link to="/admin/listings/new" className="add_listing"><button>+</button></Link></h2>
                
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
                        <ProductCard/>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ProductList;
