import React from "react";
import { Row, Col, Tabs, Icon } from "antd";
import { Query, Mutation } from "react-apollo";
import SellerProducts from "./SellerProducts";
import { GET_SELLER, FOLLOW_SHOP, UNFOLLOW_SHOP } from "../query";
import {ModalRoute} from 'react-router-modal';
import SellerPost from './SellerPost'
import Details from './Details';
const { TabPane } = Tabs;

class Seller extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let shopname = this.props.match.params.id;
    return (
      <Query query={GET_SELLER} variables={{ shopname: shopname }}>
        {({ loading, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }

          data = data.Seller;
          console.log(data);
          return (
            <div className="bg-grey">
              <div className="container">
                <div className="profile">
                  <Row>
                    <Col span={6}>
                      <div className="profile__image" />
                    </Col>
                    <Col className="profile__info" span={18}>
                      <h1>{data.name}</h1>
                      <p className="stats">
                        <span className="numbers">
                          <Icon type="file" />
                          <span className="posts"> 16</span> posts
                        </span>
                        <span className="numbers">
                          <Icon type="user" />
                          <span className="followers">
                            {data.followers.length}
                          </span>{" "}
                          followers
                        </span>
                        <span className="numbers">
                          <Icon type="user-add" />
                          <span className="connections"> 16</span> products
                        </span>
                      </p>
                      <p className="tagline">
                        <strong>@</strong>
                        {data.shopname}
                      </p>
                      <p className="tagline">{data.intro}</p>
                      <div className="button_group">
                        <Mutation mutation={FOLLOW_SHOP}>
                          {(followuser, { datas }) => (
                            <button
                              onClick={() =>
                                followuser({
                                  variables: {
                                    FollowingID: data.id
                                  },
                                  refetchQueries: ["getSeller"]
                                })
                              }
                            >
                              <Icon type="heart" />
                              &nbsp;&nbsp;Follow
                            </button>
                          )}
                        </Mutation>
                        <Mutation mutation={UNFOLLOW_SHOP}>
                          {(followuser, { datas }) => (
                            <button
                              onClick={() =>
                                followuser({
                                  variables: {
                                    FollowingID: data.id
                                  },
                                  refetchQueries: ["getSeller"]
                                })
                              }
                            >
                              <Icon type="heart" />
                              &nbsp;&nbsp;UnFollow
                            </button>
                          )}
                        </Mutation>
                        <button>
                          <Icon type="facebook" />
                          &nbsp;&nbsp;Share
                        </button>
                        <button>
                          <Icon type="twitter" />
                          &nbsp;&nbsp;Tweet
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="profile__details">
                    <Col span={24}>
                      <Tabs
                        defaultActiveKey="1"
                        size="default"
                        style={{ textAlign: "center" }}
                      >
                        <TabPane tab="Posts" key="1">
                          <SellerPost shopname={shopname} />
                        </TabPane>
                        <TabPane tab="Products" key="2">
                          <SellerProducts sellerID={data.id} {...this.props} />
                        </TabPane>
                        <TabPane tab="Reviews" key="3">
                          Content of tab 3
                        </TabPane>
                        <TabPane tab="Store Policy" key="4">
                          <div>
                            <h3>Store Policy</h3>
                            <div dangerouslySetInnerHTML={{ __html: data.policy.store }} />
                          </div>
                          <div>
                            <h3>Return Policy</h3>
                            <div dangerouslySetInnerHTML={{ __html: data.policy.return }} />
                          </div>
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>
                </div>
              </div>
              <ModalRoute path={`${this.props.match.url}/:id`} parentPath={this.props.match.url} component={Details}/>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Seller;
