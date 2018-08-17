import React from 'react';
import {Row, Col, Tabs, Icon} from 'antd';
import Feed from "./Feed/Feed";

const {TabPane} = Tabs;


const User = (props) => {
    return (
        <div className='bg-grey'>
            <div className="container">
                <div className="profile">

                    <Row>
                        <Col span={6}>
                            <div className="profile__image"/>
                        </Col>
                        <Col className="profile__info" span={18}>
                            <h1>dhruvramdev</h1>
                            <p className="stats">
                                <span className="numbers"><Icon type="file"/><span
                                    className="posts"> 16</span> posts</span>
                                <span className="numbers"><Icon type="user"/><span className="connections"> 257</span> connections</span>
                                <span className="numbers"><Icon type="user-add"/><span
                                    className="connections"> 249</span> following</span>
                            </p>
                            <p className="tagline"><strong>Dhruv Ramdev</strong></p>
                            <p className="tagline">Fusce semper vel odio eu finibus. Integer mattis enim sit amet urna
                                hendrerit, ac pulvinar augue feugiat</p>
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
                                <TabPane tab="WishList" key="1">Content of tab 1</TabPane>
                                <TabPane tab="Posts" key="2"><Feed/></TabPane>
                                <TabPane tab="Shops" key="3">Content of tab 3</TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>

            </div>
        </div>
    );
};

export default User;