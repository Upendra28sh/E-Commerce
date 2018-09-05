import React, { Component } from 'react';
import { Spin, Table } from "antd";
import { Query } from 'react-apollo';
import { GET_ALL_USERS } from './Query/query';

const columns = [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: value => <img style={{width: '80px'}} src={value} />,
        align: "center"
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
        align: "center",
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center"
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        align: "center"
    },
    {
        title: "About",
        dataIndex: "about",
        key: "about",
        align: "center"
    },
    {
        title: "Followers",
        dataIndex: "followers",
        key: "followers",
        render: value => <p>{value.length}</p>,
        align: "center"
    },
    {
        title: "Following",
        dataIndex: "following",
        key: "following",
        render: value => <p>{value.length}</p>,
        align: "center"
    },
    {
        title: "Following Shop",
        dataIndex: "followingShop",
        key: "followingShop",
        render: value => <p>{value.length}</p>,
        align: "center"
    }
]

class User extends Component {
    render() {
        return (
            <div>
                <h1>Users</h1>
                <Query query={GET_ALL_USERS}>
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
                        return <Table dataSource={data.allUsers} columns={columns} />;
                    }}
                </Query>
            </div>
        )
    }
}

export default User;