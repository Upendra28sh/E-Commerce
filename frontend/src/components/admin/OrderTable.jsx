import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { Table } from "antd";

const statusSymbol = value => value ? <div className="status status--success"></div> : <div className="status"></div>

const columns = [
  {
    title: "Order Date",
    dataIndex: "date",
    key: "date",
    align: 'center'
  },
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    align: 'center',
    render: (value) => <Link to={`/admin/orders/${value}`}>{value}</Link>
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: 'center'
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
    align: 'center'
  },
  {
    title: "Confirmed",
    dataIndex: "confirmed",
    key: "confirmed",
    align: 'center',
    render: (value) => statusSymbol(value)
  },
  {
    title: "Packed",
    dataIndex: "packed",
    key: "packed",
    align: 'center',
    render: (value) => statusSymbol(value)
  },
  {
    title: "Shipped",
    dataIndex: "shipped",
    align: 'center',
    key: "shipped",
    render: (value) => statusSymbol(value)
  },
  {
    title: "Delivered",
    dataIndex: "delivered",
    key: "delivered",
    align: 'center',
    render: (value) => statusSymbol(value)
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: 'center',
  },
  {
    title: "Payment Status",
    dataIndex: "status",
    key: "status",
    align: 'center',
  },
  {
    title: "Order Age",
    dataIndex: "age",
    key: "age",
    align: 'center',
  }
];

const source = [
  {
    date: "09-08-2018",
    id: "1004234",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: false,
    shipped: false,
    delivered: false,
    total: "Rs. 3500",
    status: "PrePaid",
    age: "1d 15h"
  },
  {
    date: "19-08-2018",
    id: "1004234",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: false,
    delivered: false,
    total: "Rs. 3900",
    status: "PrePaid",
    age: "2d 15h"
  },
  {
    date: "29-08-2018",
    id: "1004235",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: false,
    delivered: false,
    total: "Rs. 3800",
    status: "PrePaid",
    age: "3d 15h"
  },
  {
    date: "09-09-2018",
    id: "1004236",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: false,
    shipped: false,
    delivered: false,
    total: "Rs. 3700",
    status: "PrePaid",
    age: "1d 12h"
  },
  {
    date: "09-09-2018",
    id: "1004237",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: true,
    delivered: true,
    total: "Rs. 3700",
    status: "PrePaid",
    age: "1d 12h"
  },
  {
    date: "09-09-2018",
    id: "1004238",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: true,
    delivered: false,
    total: "Rs. 3700",
    status: "PrePaid",
    age: "1d 12h"
  },
  {
    date: "09-09-2018",
    id: "1004239",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: true,
    delivered: false,
    total: "Rs. 3700",
    status: "PrePaid",
    age: "1d 12h"
  }
];

class OrderTable extends Component {
  render() {
    return (
      <div>
        <Table dataSource={source} columns={columns} />
      </div>
    );
  }
}

OrderTable.propTypes = {};

export default OrderTable;
