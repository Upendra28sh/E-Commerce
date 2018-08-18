import React, {Component} from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {Table} from "antd";
import * as actions from '../../actions/admin';
import {connect} from 'react-redux';
import {runInThisContext} from "vm";

const statusSymbol = value => value ? <div className="status status--success"></div> : <div className="status"></div>;

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

class OrderTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Table dataSource={this.props.orders} columns={columns}/>
                {console.log(this.props)}
            </div>
        );
    }
}

export default OrderTable
