import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { Card, Row, Col, Dropdown, Steps } from "antd";
import gql from "graphql-tag";
import { Spin, message } from "antd";
import { Query } from "react-apollo";

const Step = Steps.Step;

const item = {
  date: "date",
  id: "id",
  user: "user.name",
  city: "shipping.address.city",
  Total: "total",
  PayStatus: "payment.status",
  age: "1d 12h",
  paymode: "payment.mode",
  products: "products[0].name"
};

function GET_ORDERDETAIL(id) {
  return gql`
  {
    Order(id:"${id}") {
      id
      user {
        name
      }
      date
      total
      payment {
        status
        mode
      }
      shipping {
        address {
          city
        }
      }
      products{
        id
        name
      }
      status {
        confirmed
        packed
        shipped
        delivered
      }
    }
  }
`;
}

class OrderDetails extends Component {
  constructor(props) {
    super(props);
  }

  status(data) {
    let cureentstep = 0;
    if (data.delivered === true) {
      cureentstep = 3;
    } else if (data.shipped === true) {
      cureentstep = 2;
    } else if (data.packed === true) {
      cureentstep = 1;
      console.log("hjh");
    } else if (data.confirmed === true) {
      cureentstep = 0;
    }

    return (
      <div
        style={{
          backgroundColor: "white",
          marginTop: "20px"
        }}
      >
        <Steps current={cureentstep}>
          <Step title="Confirmed" description="This is a description." />
          <Step title="Packed" description="This is a description." />
          <Step title="Shipped" description="This is a description." />
          <Step title="Delivered" description="This is a description." />
        </Steps>{" "}
      </div>
    );
  }

  render() {
    const header = (
      <div className="order_header">
        <span className="order_header__title"> Order Details </span>{" "}
        <span className="order_header__id"> {this.props.match.params.id} </span>{" "}
      </div>
    );

    return (
      <div style={{ textAlign: "center" }}>
        <Query query={GET_ORDERDETAIL(this.props.match.params.id)}>
          {({ loading, error, data }) => {
            if (loading) return <Spin size="large" />;
            if (error) return message.error("Some issue with database");
            return (
              <div>
                {" "}
                {console.log("orderdetail", data)}{" "}
                <Card
                  title={header}
                  style={{
                    width: "50%",
                    margin: "auto"
                  }}
                >
                  <div className="order">
                    <Row>
                      <Col span={16} className="order__details">
                        <div>
                          <table className="order__details">
                            {" "}
                            {Object.keys(item).map(prop => (
                              <tr>
                                <th> {prop.toUpperCase()} </th>{" "}
                                <td> {_.get(data.Order, item[prop])} </td>{" "}
                              </tr>
                            ))}{" "}
                          </table>{" "}
                        </div>{" "}
                      </Col>{" "}
                      <Col span={8}>
                        <img
                          src="http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg"
                          alt={item.name}
                        />{" "}
                      </Col>{" "}
                      {/* <Dropdown overlay={status} trigger={['click']}>
                                                    <span className="order-status">Order Status</span>
                                                </Dropdown> */}{" "}
                      {this.status(data.Order.status)}{" "}
                    </Row>{" "}
                  </div>{" "}
                </Card>{" "}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default OrderDetails;
