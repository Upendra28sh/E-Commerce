import React, {Component} from 'react';
import {Col, Row, Spin, Table} from "antd";
import {Query , withApollo} from 'react-apollo';
import ApprovalDialog from './ApprovalDialog';
import {GET_APPROVAL_PRODUCTS, HANDLE_APPROVAL} from './Query/query';
// import ApolloClient from "apollo-boost";
//
// const client = new ApolloClient({
//     uri: "http://localhost:4000/graphql"
// });

const columns = [
    {
        title: "Image",
        dataIndex: "origin.image",
        key: "image",
        render: value => <img style={{width: '80px'}} src={value}/>,
        align: "center"
    },
    {
        title: "Name",
        dataIndex: "origin.name",
        key: "name",
        align: "center",
    },
    {
        title: "Price",
        dataIndex: "origin.price",
        key: "price",
        align: "center"
    },
    {
        title: "Seller Name",
        dataIndex: "origin.seller",
        key: "seller name",
        render: (value = {}) => {
            return value.name;
        },
        align: "center"
    },
    {
        title: "Seller Shopname",
        dataIndex: "origin.seller",
        key: "seller shopname",
        render: (value = {}) => {
            return value.shopName;
        },
        align: "center"
    },
    {
        title: "Approve",
        dataIndex: "id",
        key: "approve",
        render: (value = {}) => {
            return (
                <ApprovalDialog
                    handleApproval={
                        (s , client) => {
                            client.mutate({
                                mutation: HANDLE_APPROVAL,
                                variables: {
                                    "id": value,
                                    "comment": s.comment,
                                    "approved": s.yesModal
                                } ,
                                refetchQueries : ['getProductApproval']
                            }).then(
                                data => console.log("MUTATION", data)
                            );
                        }
                    }
                />
            );
        },
        align: "center"
    }
];

class ProductApproval extends Component {
    render() {
        return (
            <div>
                <h1>Product Approvals</h1>
                <Query query={GET_APPROVAL_PRODUCTS}>
                    {({loading, error, data}) => {
                        if (loading)
                            return (
                                <Table
                                    dataSource={[]}
                                    locale={{emptyText: <Spin size="large"/>}}
                                    columns={columns}
                                />
                            );
                        if (error)
                            return (
                                <Table
                                    dataSource={[]}
                                    locale={{emptyText: "connection error"}}
                                    columns={columns}
                                />
                            );
                        console.log(data.getProductApproval);
                        return <Table
                            dataSource={data.getProductApproval}
                            expandedRowRender={record => (
                                <Row>
                                    <Col span={6} offset={2}>
                                        <img
                                            src={record.image} alt=""
                                            style={{width: '100%', padding: "0 20px 20px 20px"}}/>
                                    </Col>
                                    <Col span={14}>
                                        <h2>{record.name}</h2>
                                        <h3>{record.shopName}</h3>
                                        <p>{record.about}</p>
                                    </Col>
                                </Row>
                            )}
                            columns={columns}
                        />;
                    }}
                </Query>
            </div>
        );
    }
}

export default withApollo(ProductApproval);