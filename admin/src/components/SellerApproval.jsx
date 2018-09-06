import React, { Component } from 'react'
import { Spin, Table, Col, Row, Tag , Icon  } from "antd";
import { Query } from 'react-apollo';
import { GET_APPROVAL_SELELRS } from './Query/query';

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
        title: "Shopname",
        dataIndex: "origin.shopName",
        key: "price",
        align: "center"
    },  
    {
        title: "About",
        dataIndex: "origin.about",
        key: "about",
        align: "center"
    },
    {
        title: "Approve",
        dataIndex: "id",
        key: "approve",
        render: value => {
            return (
                <div>
                    <div onClick={() => alert(`Approve ${value}`)}>
                        <Icon type='check'/>
                    </div>
                    <div onClick={() => alert(`Fail ${value}`)}>
                        <Icon type='close'/>
                    </div>
                </div>
            )
        },
        align: "center"
    }
];
  
class SellerApproval extends Component {
    state = {
        comment: '',
        yesModal: false,
        noModal: false
    }
    render() {
        return (
            <div>
                <h1>Seller Approvals</h1>
                <Query query={GET_APPROVAL_SELELRS}>
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
                        console.log(data);
                        return <Table 
                            dataSource={data.getSellerApproval} 
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
        )
    }
}

export default SellerApproval;