import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table } from "antd";
import * as actions from '../../actions/admin';
import { connect } from 'react-redux';

const columns = [
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
    align: 'center',
    render: (value) => <Link to="/user/102">{value}</Link>

  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: 'center'
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
    align: 'center',
  },
  {
    title: "Total Spent",
    dataIndex: "total",
    key: "total",
    align: 'center'
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: 'center'
  },
  {
    title: "Latest Purchase",
    dataIndex: "latest",
    key: "latest",
    align: 'center',
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
        contact: 9999999900,
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
  componentDidMount()
  {
    this.props.allUsers();
  }
  render() {
    return (
      <div>
        <Table dataSource={this.props.users} columns={columns} />
      </div>
    );
  }
}

export default connect(
  state => state,
  actions
)(UserTable);

