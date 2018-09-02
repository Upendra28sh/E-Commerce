import React from "react";
import {
  Row,
  Col,
  Tabs,
  Icon,
  Input,
  Form,
  Divider,
  Menu,
  Button,
  message,
  Upload
} from "antd";
import { Query, Mutation } from "react-apollo";
import SellerProducts from "./SellerProducts";
import { GET_SELLER, FOLLOW_SHOP, UNFOLLOW_SHOP } from "../query";
import { ModalRoute } from "react-router-modal";
import SellerPost from "./SellerPost";
import Details from "./Details";
const { TabPane } = Tabs;
const props = {
  name: "file",
  action: "//jsonplaceholder.typicode.com/posts/",
  headers: {
    authorization: "authorization-text"
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
};
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
                          <div className="container_80">
                            <div style={{ position: "relative" }}>
                              <Input.TextArea rows={7} placeholder="Add Post Here .... " />{" "}
                              <Button
                                style={{
                                  position: "absolute",
                                  bottom: "10px",
                                  right: "10px"
                                }}
                                type="primary"
                                shape="circle"
                              >
                                {" "}
                                <i className="fa fa-send-o" />
                              </Button>
                             
                                <Button
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px"
                                  }}
                                >
                                  <Icon type="upload" /> Upload
                                </Button>
                               
                            </div>
                          </div>

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
              <ModalRoute
                path={`${this.props.match.url}/:id`}
                parentPath={this.props.match.url}
                component={Details}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Seller;
