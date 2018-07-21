import React from 'react';
import { Row, Col, Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const Seller = (props) => {
    return (
        <div>
            <Row>
                <Col span={10}>
                    <img src="https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble_1x.png" className="profile__image"/>
                </Col>
                <Col span={14} className="profile__details">
                    <h2 className="profile__name">Seller Name</h2>
                    <p className="profile__stats">
                        <span><span class="posts">16</span> posts</span>
                        <span><span class="followers">257</span> followers</span>
                        <span><span class="connections">249</span> following</span>
                    </p>
                    <button className="btn btn-primary">Connect</button>
                </Col>
            </Row>
            <Row>
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