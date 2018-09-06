import React, { Component } from 'react';
import { Spin, Table } from "antd";
import { Query } from 'react-apollo';
import { GET_ALL_PRODUCTS } from './Query/query';

const columns = [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: value => <img style={{width: '80px'}} src={`/images/${value}`} />,      
        align: "center"
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
    },
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        align: "center"
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        align: "center"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center"
    },
    {
        title: "Seller",
        dataIndex: "seller.shopName",
        key: "seller",
        align: "center"
    }
]

class User extends Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
                <Query query={GET_ALL_PRODUCTS}>
                    {({ loading, error, data }) => {
                        if (loading)
                        return (
                            <Table
                                dataSource={[]}
                                locale={{ emptyText: <Spin size="large" /> }}
                                columns={columns}
                            />
                        );
                        if (error) {
                            // console.log(error);
                            return (
                                <Table
                                    dataSource={[]}
                                    locale={{ emptyText: "connection error" }}
                                    columns={columns}
                                />
                            );
                        }
                        // console.log(data);
                        return <Table dataSource={data.allProducts} columns={columns} />;
                    }}
                </Query>
            </div>
        )
    }
}

export default User;