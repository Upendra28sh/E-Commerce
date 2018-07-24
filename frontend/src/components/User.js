import React from 'react';
import { Row, Col, Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const User = (props) => {
    return (
        <div>
            <Row>
                <Col span={10}>
                    <img src="https://cdn.dribbble.com/users/199982/screenshots/4044699/furkan-avatar-dribbble_1x.png" className="user__image"/>
                </Col>
                <Col span={14} className="user__details">
                    <h2 className="user__name">User Name</h2>
                    <p className="user__stats">
                        <span><span class="posts">16</span> posts</span>
                        <span><span class="followers">257</span> followers</span>
                        <span><span class="connections">249</span> following</span>
                    </p>
                    <button className="btn btn-primary">Follow</button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tabs defaultActiveKey="1" size="default" style={{textAlign: 'center'}}>
                        <TabPane tab="Posts" key="1">Content of tab 1</TabPane>
                        <TabPane tab="Connections" key="2">Content of tab 2</TabPane>
                        <TabPane tab="Followers" key="3">Content of tab 3</TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    );
}

export default User;