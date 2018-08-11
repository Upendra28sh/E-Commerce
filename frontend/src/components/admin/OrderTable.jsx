import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'antd';

const columns = [{
    title: 'Order Date',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
}, {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
}, {
    title: 'Confirmed',
    dataIndex: 'confirmed',
    key: 'confirmed',
}, {
    title: 'Packed',
    dataIndex: 'packed',
    key: 'packed',
}, {
    title: 'Shipped',
    dataIndex: 'shipped',
    key: 'shipped',
}, {
    title: 'Delivered',
    dataIndex: 'delivered',
    key: 'delivered',
}, {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
}, {
    title: 'Payment Status',
    dataIndex: 'status',
    key: 'status',
}, {
    title: 'Order Age',
    dataIndex: 'age',
    key: 'age',
}];


const source = [{
    date: "09-08-2018",
    id: "1004234",
    name: "Dhruv Ramdev",
    city: "Delhi",
    confirmed: true,
    packed: true,
    shipped: true,
    delivered: true,
    total: "Rs. 3500",
    status: "PrePaid",
    age: "1d 15h"
}];

class OrderTable extends Component {
    render() {
        return (
            <div>
                <Table dataSource={source} columns={columns}></Table>

            </div>
        );
    }
}

OrderTable.propTypes = {};

export default OrderTable;
