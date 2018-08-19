import React, { Component } from "react";
import OrderCard from "./_deprecated/OrderCard";
import { Link } from "react-router-dom";
import OrderTable from "./OrderTable";
import { Spin, Table } from "antd";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
const GET_ORDERS = gql`
  {
    allOrders {
      id
      user {
        name
      }
      date
      total
      payment {
        status
      }
      shipping {
        address {
          city
        }
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

class OrderList extends Component {
  render() {
    return (
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
          return <Table dataSource={data.allOrders} columns={columns} />;
        }}
      </Query>
    );
  }
}

export default OrderList;
