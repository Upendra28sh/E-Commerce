import React from 'react';
import {Row, Col, Icon, Tabs} from 'antd';
import {Query} from 'react-apollo';
import {GET_SELLER} from '../Query/query';
import SellerPostContainer from "./SellerPostContainer";
import SellerProducts from "./SellerProducts";

const {TabPane} = Tabs;

class Profile extends React.Component {
    render() {
        return (
            <Query query={GET_SELLER}>
                {({loading, data}) => {
                    if (loading) {
                        return <p>Laoding..</p>
                    }
                    data = data.getSeller;
                    console.log(data);

                    // return <p>HEllo</p>
                    return (
                        <div className="bg-grey">
                            <div className="container">
                                <div className="profile">
                                    <Row>
                                        <Col span={6}>
                                            <div className="profile__image"
                                                 style={{backgroundImage: `url('${data.image}')`}}/>
                                        </Col>
                                        <Col className="profile__info" span={18}>
                                            <div>
                                                <h1  style={{display : 'inline-block'}}>{data.name}</h1>
                                                <div className="button_group">
                                                    <button>
                                                        Follow
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="tagline">{data.intro}
                                            </p>
                                            <p className="stats">
                                                <span className="numbers">
                                                  <Icon type="file"/>
                                                  <span className="posts"> {0}</span> posts
                                                </span>
                                                <span className="numbers">
                                                  <Icon type="user"/>
                                                  <span className="followers"> {data.followers.length}</span> followers
                                                </span>
                                                <span className="numbers">
                                                  <Icon type="user-add"/>
                                                  <span
                                                      className="connections"> {0}</span> products
                                                </span>
                                            </p>

                                        </Col>
                                    </Row>
                                    <Row className="profile__details">
                                        <Col span={24}>
                                            <Tabs
                                                defaultActiveKey="1"
                                                size="default"
                                                style={{textAlign: "center"}}
                                            >
                                                <TabPane tab="Products" key="1">
                                                    <SellerProducts seller={data.id} {...this.props} />
                                                </TabPane>
                                                <TabPane tab="Posts" key="2">
                                                    <SellerPostContainer shopName={data.name} seller={data.id}/>
                                                </TabPane>

                                                <TabPane tab="About" key="3">
                                                    <p>{data.about}</p>
                                                </TabPane>
                                                <TabPane tab="Store Policy" key="4">
                                                    <div>
                                                        <h3>Store Policy</h3>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: data.policy.store
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3>Return Policy</h3>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: data.policy.return
                                                            }}
                                                        />
                                                    </div>
                                                </TabPane>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        )
    }
}

export default Profile;