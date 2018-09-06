import React, {Component} from 'react';
import {Spin, Table, Button ,Tag, Icon, Row, Col} from "antd";
import {Link} from 'react-router-dom';
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
        title: "Caption",
        dataIndex: "caption",
        key: "caption",
        align: "center",
    }
];

class User extends Component {
    render() {
        return (
            <div>
                <h1>Products </h1>
                <Button type='primary' ghost><Link to={'/product/new'}>Add New Product <Icon type='plus'/></Link></Button>
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