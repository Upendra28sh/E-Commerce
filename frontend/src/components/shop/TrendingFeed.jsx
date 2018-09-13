import React from 'react';
import {Col, Icon, Row} from 'antd';

// TODO : 3 on mobile and 4 on desktop

class TrendingFeed extends React.Component {


    render() {

        return <div className="container">
            <br/>
            <h2>Explore Products</h2>
            <br/>
            <Row gutter={{xs: 2, sm: 8, md: 12, lg: 16}} className="row_feed">
                <Col span={6}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product1.jpg"/>
                    <div className="topRight">
                        <Icon type="camera"/>
                    </div>
                </Col>
                <Col span={6}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product2.jpg"/>
                    <Icon type="video-camera" theme="filled" className="topRight"/>
                </Col>
                <Col span={6}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product3.jpg"/>
                    <Icon type="file-text" theme="filled" className="topRight"/>
                </Col>
                <Col span={6}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product3.jpg"/>
                    <Icon type="file-text" theme="filled" className="topRight"/>
                </Col>
            </Row>
            <Row gutter={{xs: 2, sm: 8, md: 12, lg: 16}} className="row_feed">
                <Col span={8}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product1.jpg"/>
                    <Icon type="camera" className="topRight"/>
                </Col>
                <Col span={8}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product2.jpg"/>
                    <Icon type="video-camera" theme="filled" className="topRight"/>
                </Col>
                <Col span={8}>
                    <img style={{maxHeight: '100%', maxWidth: '100%'}} src="./product_images/product3.jpg"/>
                    <Icon type="file-text" theme="filled" className="topRight"/>
                </Col>
            </Row>

        </div>;
    }


}

export default TrendingFeed;