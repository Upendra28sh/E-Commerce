import React from 'react';
import {Row,Col, Icon} from 'antd'

class TrendingFeed extends React.Component{


    render(){

        return <div className="container" >
        <br/>
        <h1 style={{textAlign:'center'}}>Trending Feeds</h1>
        <br/>
         <Row gutter={{xs : 2, sm: 8, md: 12, lg: 16 }} className="row_feed" >
      <Col span={8}>
        <img style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product1.jpg" />
        <Icon type="camera" className="topRight"></Icon>
      </Col>
      <Col span={8}>
      <img style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product2.jpg" />
      <Icon type="video-camera" theme="filled" className="topRight"></Icon>
      </Col>
      <Col  span={8}>
      <img  style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product3.jpg" />
      <Icon type="file-text" theme="filled" className="topRight"></Icon>
      </Col>
    </Row>
    <Row gutter={{xs : 2, sm: 8, md: 12, lg: 16 }} className="row_feed">
      <Col span={8}>
        <img style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product1.jpg" />
        <Icon type="camera" className="topRight"></Icon>
      </Col>
      <Col span={8}>
      <img style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product2.jpg" />
      <Icon type="video-camera" theme="filled" className="topRight"></Icon>
      </Col>
      <Col  span={8}>
      <img  style={{maxHeight:'100%',maxWidth:'100%'}}  src="./product_images/product3.jpg" />
      <Icon type="file-text" theme="filled" className="topRight"></Icon>
      </Col>
    </Row>

    </div>
    }


}

export default TrendingFeed;