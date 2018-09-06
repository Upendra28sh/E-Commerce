import React, { Component } from 'react';
import { Spin, Table, Row, Col } from "antd";
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
                        return <Table 
                            dataSource={data.allUsers} 
                            expandedRowRender={record => (
                                <Row>
                                    <Col span={6} offset={2}>
                                        <img src={record.image} alt=""
                                             style={{width: '100%', padding: "0 20px 20px 20px"}}/>
                                    </Col>
                                    <Col span={14}>
                                        <h2>{record.name}</h2>
                                        <h3>@ {record.username}</h3>
                                        <p>{record.about}</p>
                                    </Col>
                                </Row>
                            )}
                            columns={columns} 
                        />;
                    }}
                </Query>
            </div>
        )
    }
}

export default User;