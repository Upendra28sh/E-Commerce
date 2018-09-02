import React from "react";
import { Row, Col, Tabs, Icon } from "antd";
import Feed from "./Feed/Feed";
import { GET_USER, FOLLOW_USER, UNFOLLOW_USER } from "../query";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import NotFound from "./NotFound";

import UserPosts from "./UserPosts";
import UserFollowingShops from "./UserFollowingShops";

const { TabPane } = Tabs;

const User = props => {
  let username = props.match.params.id;

  console.log(props);
  return (
    <Query
      query={GET_USER}
      variables={{
        username: username
      }}
    >
      {({ loading, data }) => {
        if (loading) {
          return "Loading";
        }
        console.log("Profile Data : ", data);
        const user = data.User;
        console.log(user);
        if (user === null) {
          return <NotFound />;
        }
        return (
          <div className="bg-grey">
            <div className="container">
              <div className="profile">
                <Row>
                  <Col span={6}>
                    <div className="profile__image" />
                  </Col>
                  <Col className="profile__info" span={18}>
                    <h1>{user.username}</h1>
                    <p className="stats">
                      <span className="numbers">
                        <Icon type="file" />
                        <span className="posts"> 16</span> posts
                      </span>
                      <span className="numbers">
                        <Icon type="user" />
                        <span className="connections">
                          {user.followers.length}
                        </span>{" "}
                        follower
                      </span>
                      <span className="numbers">
                        <Icon type="user-add" />
                        <span className="connections">
                          {" "}
                          {user.following.length}
                        </span>{" "}
                        following
                      </span>
                    </p>
                    <p className="tagline">
                      <strong>{user.name}</strong>
                    </p>
                    <p className="tagline">{user.about}</p>
                    <div className="button_group">
                      <Mutation mutation={FOLLOW_USER}>
                        {(followuser, { data }) => (
                          <button
                            onClick={() =>
                              followuser({
                                variables: {
                                  FollowingID: user.id
                                },
                                refetchQueries: ["user"]
                              })
                            }
                          >
                            <Icon type="heart" />
                            &nbsp;&nbsp;Follow
                          </button>
                        )}
                      </Mutation>
                      <Mutation mutation={UNFOLLOW_USER}>
                        {(followuser, { data }) => (
                          <button
                            onClick={() =>
                              followuser({
                                variables: {
                                  FollowingID: user.id
                                },
                                refetchQueries: ["user"]
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
                      <TabPane tab="WishList" key="1">
                        Content of tab 1
                      </TabPane>
                      <TabPane tab="Posts" key="2">
                        <UserPosts username={username} />
                      </TabPane>
                      <TabPane tab="Shops" key="3">
                        <UserFollowingShops ids={user.followingShop} />
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
  );
};

export default User;
