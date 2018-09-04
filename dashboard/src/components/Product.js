import React, {Component} from 'react';
import {Spin, Table, Tag, Row, Col} from "antd";
import {Query} from 'react-apollo';
import {GET_ALL_PRODUCTS} from './Query/query';

const statusSymbol = value =>
    value ? (
        <div className="status status--success"/>
    ) : (
        <div className="status"/>
    );


const columns = [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: value => <img style={{width: '80px'}} src={value}/>,
        align: "center"
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center"
    },
    {
        title: "Sizes",
        dataIndex: "sizes",
        key: "sizes",
        render: value => {
            return value.map((v, index) => (<Tag key={index}>{v}</Tag>));
        },
        align: "center"
    },
    {
        title: "COD",
        dataIndex: "codAccepted",
        key: "codAccepted",
        render: value => statusSymbol(value),
        align: "center"
    },
    {
        title: "Return",
        dataIndex: "returnAccepted",
        key: "returnAccepted",
        render: value => {
            console.log(value);
            return statusSymbol(value);
        },
        align: "center"
    },
];

class User extends Component {
    render() {
        return (
            <div>
                <h1>Products</h1>
                <Query query={GET_ALL_PRODUCTS}>
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
                        console.log(data);
                        return <Table
                            dataSource={data.getProductBySeller}
                            rowKey="id"
                            expandedRowRender={record => (
                                <Row>
                                    <Col span={6} offset={2}>
                                        <img src={record.image} alt=""
                                             style={{width: '100%', padding: "0 20px 20px 20px"}}/>
                                    </Col>
                                    <Col span={14}>
                                        <h2>{record.name}</h2>
                                        <h3>₹ {record.price}</h3>
                                        <p>{record.description}</p>
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

export default User;