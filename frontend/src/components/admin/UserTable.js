import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import * as actions from "../../actions/admin";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_ORDERS = gql`
  {
    allUsers {
      image
      id
      name
      about
      email
    }
  }
`;
const columns = [
  {
    title: "Customer",
    dataIndex: "name",
    key: "customer",
    align: "center",
    render: value => <Link to="/user/102">{value}</Link>
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center"
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
    align: "center"
  },
  {
    title: "Total Spent",
    dataIndex: "total",
    key: "total",
    align: "center"
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: "center"
  },
  {
    title: "Latest Purchase",
    dataIndex: "latest",
    key: "latest",
    align: "center"
  },
  {
    title: "Contact",
    dataIndex: "contact",
    key: "contact",
    align: "center"
  }
];

const source = [
  {
    customer: "Saurabh",
    email: "abc@gmail.com",
    orders: 2,
    total: 32000,
    city: "New Delhi",
    latest: "13/04/18",
    contact: 9999999900
  },
  {
    customer: "Saurabh",
    email: "abc@gmail.com",
    orders: 2,
    total: 32000,
    city: "New Delhi",
    latest: "13/04/18",
    contact: 9999999900
  },
  {
    customer: "Saurabh",
    email: "abc@gmail.com",
    orders: 2,
    total: 32000,
    city: "New Delhi",
    latest: "13/04/18",
    contact: 9999999900
  },
  {
    customer: "Saurabh",
    email: "abc@gmail.com",
    orders: 2,
    total: 32000,
    city: "New Delhi",
    latest: "13/04/18",
    contact: 9999999900
  },
  {
    customer: "Saurabh",
    email: "abc@gmail.com",
    orders: 2,
    total: 32000,
    city: "New Delhi",
    latest: "13/04/18",
    contact: 9999999900
  }
];

class UserTable extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Query query={GET_ORDERS}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Table
                  dataSource={[]}
                  locale={{ emptyText: <Spin size="large" /> }}
                  columns={columns}
                />
              );
            if (error)
              return (
                <Table
                  dataSource={[]}
                  locale={{ emptyText: "connection error" }}
                  columns={columns}
                />
              );
            return (
              <div>
                <Table dataSource={data.allUsers} columns={columns} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default UserTable;
