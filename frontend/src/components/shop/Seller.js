import React from 'react';
import {Row, Col, Tabs, Icon} from 'antd';

const {TabPane} = Tabs;

const Seller = (props) => {
    return (

        <div className="container_40 profile">
            <Row>
                <Col span={10}>
                    <div
                        className="profile__image"
                        style={{backgroundImage: "url('https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png')"}}>
                    </div>
                </Col>
                <Col className="profile__info" span={14}>
                    <h1>User Name</h1>
                    <p className="tagline">Fusce semper vel odio eu finibus. Integer mattis enim sit amet urna
                        hendrerit, ac pulvinar augue feugiat</p>
                    <p>
                        <span className="numbers"><Icon type="file"/><span className="posts"> 16</span> posts</span>
                        | <span className="numbers"><Icon type="user"/><span className="followers"> 257</span> followers</span>
                        | <span className="numbers"><Icon type="user-add"/><span className="connections"> 249</span> following</span>
                    </p>
                    <div className="button_group">
                        <button><Icon type="heart"/>&nbsp;&nbsp;Follow</button>
                        <button><Icon type="facebook"/>&nbsp;&nbsp;Share</button>
                        <button><Icon type="twitter"/>&nbsp;&nbsp;Tweet</button>
                    </div>

                </Col>
            </Row>
            <Row className="profile__details">
                <Col span={24}>
                    <Tabs defaultActiveKey="1" size="default" style={{textAlign: 'center'}}>
                        <TabPane tab="Products" key="1">Content of tab 1</TabPane>
                        <TabPane tab="Posts" key="2">Content of tab 2</TabPane>
                        <TabPane tab="Reviews" key="3">Content of tab 3</TabPane>
                        <TabPane tab="Store Policy" key="4">Content of tab 4</TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default Seller;