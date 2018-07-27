import React from 'react';
import { Row, Col, Tabs, Icon } from 'antd';

const { TabPane } = Tabs;


const User = (props) => {
    return (
        <div>
            <Row>
                <Col id="profile" span={10}>
                    <div 
                        id="profile-img" 
                        style={{backgroundImage: "url('https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png')"}}>
                    </div>
                </Col>
                <Col span={14} className="profile__details">
                    <h2 className="profile__name">User Name</h2>
                    <p className="profile__stats">
                        <span><Icon type="file" /><span className="posts"> 16</span> posts</span>
                        <span><Icon type="user" /><span className="followers"> 257</span> followers</span>
                        <span><Icon type="user-add" /><span className="connections"> 249</span> following</span>
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