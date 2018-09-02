import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";

const statusSymbol = value =>
  value ? (
    <div className="status status--success" />
  ) : (
    <div className="status" />
  );

const columns = [
  {
    title: "Order Date",
    dataIndex: "date",
    key: "date",
    align: "center"
  },
  {
    title: "Order ID",
    dataIndex: "id",
    key: "id",
    align: "center",
    render: value => <Link to={`/admin/orders/${value}`}>{value}</Link>
  },
  {
    title: "Name",
    dataIndex: "user.name",
    key: "name",
    align: "center"
  },
  {
    title: "City",
    dataIndex: "shipping.address.city",
    key: "city",
    align: "center"
  },
  {
    title: "Confirmed",
    dataIndex: "status.confirmed",
    key: "confirmed",
    align: "center",
    render: value => statusSymbol(value)
  },
  {
    title: "Packed",
    dataIndex: "status.packed",
    key: "packed",
    align: "center",
    render: value => statusSymbol(value)
  },
  {
    title: "Shipped",
    dataIndex: "status.shipped",
    align: "center",
    key: "shipped",
    render: value => statusSymbol(value)
  },
  {
    title: "Delivered",
    dataIndex: "status.delivered",
    key: "delivered",
    align: "center",
    render: value => statusSymbol(value)
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center"
  },
  {
    title: "Payment Status",
    dataIndex: "payment.status",
    key: "status",
    align: "center"
  },
  {
    title: "Order Age",
    dataIndex: "age",
    key: "age",
    align: "center"
  }
];

class OrderTable extends Component {
  render() {
    return (
      <div>
        <Table dataSource={this.props.orders} columns={columns} />
        {console.log(this.props)}
      </div>
    );
  }
}

export default OrderTable;
