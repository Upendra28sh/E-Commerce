import React, {Component} from 'react';
import {Spin, Table, Row, Col, Button, message} from "antd";
import {Query, withApollo} from 'react-apollo';
import {CONFIRM_PRODUCT_FROM_ORDER, GET_ALL_ORDERS} from './Query/query';

// TODO : SHIP ORDERS
// TODO : Saurabh

function pivot_orders(orders) {
    let result = [];
    let insertData = {};

    orders.forEach(order => {

        order.products.forEach(product => {

            insertData = {
                ...order
            };
            delete insertData.products;
            delete insertData.total;


            insertData.product = product;
            result.push(insertData);


        });
    });
    // console.log(result);
    // return orders
    return result;

}

const statusSymbol = value =>
    value ? (
        <div className="status status--success"/>
    ) : (
        <div className="status"/>
    );

const Title = () => (
    <div>
        <Row>Product</Row>
        <hr style={{border: "solid 0.5px rgb(230,230,230)"}}/>
        <Row>
            {/*<Col span={7}>Image</Col>*/}
            <Col span={10}>Name</Col>
            <Col span={7}>Quantity</Col>
            <Col span={7}>SelectedSize</Col>
        </Row>
    </div>
);

const columns = [
    {
        title: <Title/>,
        dataIndex: "product",
        key: "product",
        align: "center",
        width: 500,
        render: (product) => {
            return (
                <Row style={{marginTop: '10px'}}>
                    {/*<Col span={7}><img style={{width: '80px'}} src={product.product.image}/></Col>*/}
                    <Col span={10}>{product.product.name}</Col>
                    <Col span={7}>{product.itemCount}</Col>
                    <Col span={7}>{product.selectedSize !== "undefined" ? product.selectedSize : ""}</Col>
                </Row>
            );
        }
    },
    // {
    //     title: "User",
    //     dataIndex: "user",
    //     key: "user",
    //     align: "center",
    //     render: value => <p>{value.username}</p>
    // },
    // {
    //     title: "Shipping",
    //     dataIndex: "shipping",
    //     key: "shipping",
    //     align: "center",5b90547775fdb44194d3cef4
    //     render: value => {
    //         value = value.address;
    //         return <p>{value.address}, {value.street}, {value.city}, {value.state}, {value.zipcode}</p>;
    //     }
    // },
    {
        title: "Order_Number",
        dataIndex: "order_number",
        key: "order_number",
        align: "center"
    },
    {
        title: "Confirmed",
        dataIndex: "product.status.confirmed",
        key: "confirmed",
        align: "center",
        render: value => statusSymbol(value)
    },
    {
        title: "Packed",
        dataIndex: "product.status.packed",
        key: "packed",
        align: "center",
        render: value => statusSymbol(value)
    },
    {
        title: "Shipped",
        dataIndex: "product.status.shipped",
        align: "center",
        key: "shipped",
        render: value => statusSymbol(value)
    },
    {
        title: "Delivered",
        dataIndex: "product.status.delivered",
        key: "delivered",
        align: "center",
        render: value => statusSymbol(value)
    },
    {
        title: "Payment Mode",
        dataIndex: "payment.mode",
        key: "mode",
        align: "center",
    },
    {
        title: "Payment Status",
        dataIndex: "payment.status",
        key: "status",
        align: "center",
    },
];

class Order extends Component {

    confirmProduct(order_number, product_id) {
        this.props.client.mutate({
            mutation: CONFIRM_PRODUCT_FROM_ORDER,
            variables: {
                input: {
                    order_number,
                    product_id
                }
            },
            refetchQueries: ['getOrdersBySeller']
        }).then(({data}) => {
            if (data.confirmProductFromOrder.success) {
                message.success("Product Confirmed");
            } else {
                message.error("Product Not Confirmed. Error!");
            }
        });

    }
    shipProduct(order) {
        console.log(order);
        // this.props.client.mutate({
        //     mutation: CONFIRM_PRODUCT_FROM_ORDER,
        //     variables: {
        //         input: {
        //             order_number,
        //             product_id
        //         }
        //     },
        //     refetchQueries: ['getOrdersBySeller']
        // }).then(({data}) => {
        //     if (data.confirmProductFromOrder.success) {
        //         message.success("Product Confirmed");
        //     } else {
        //         message.error("Product Not Confirmed. Error!");
        //     }
        // });
        this.props.history.push({
            pathname: `/orders/${order.order_number}/ship`,
            state: {
                order: order
            }
        });

    }

    render() {
        return (
            <div>
                <h1>Orders</h1>
                <Query query={GET_ALL_ORDERS}>
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


                        data = data.getOrdersBySeller;
                        data = pivot_orders(data);
                        console.log("Transformed Data : ", data);
                        return <Table
                            dataSource={data}
                            columns={columns}
                            expandedRowRender={order => {
                                let address = order.shipping.address;
                                return (
                                    <div>
                                        <Row>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={6} offset={2}>
                                                        <img src={order.product.product.image} alt=""
                                                             style={{width: '100%', padding: "0 20px 20px 20px"}}/>
                                                    </Col>
                                                    <Col span={14}>
                                                        <h2>{order.product.product.name}</h2>
                                                        <h3>₹ {order.product.product.price}</h3>
                                                        <p>
                                                            <li>Order Quantity : {order.product.itemCount}</li>
                                                            <li>Order Size : {order.product.selectedSize}</li>
                                                        </p>
                                                    </Col>
                                                </Row>

                                            </Col>
                                            <Col span={12}>
                                                <div>
                                                    <p>
                                                        Shipping Address
                                                        : {address.address}, {address.street}, {address.city}, {address.state}, {address.zipcode}
                                                    </p>
                                                </div>
                                                {  !order.product.status.confirmed && (
                                                    <Button
                                                        onClick={() => {
                                                            this.confirmProduct(order.order_number, order.product._id);
                                                        }}>
                                                        Confirm Order
                                                    </Button>
                                                )}
                                                {  (order.product.status.confirmed && !order.product.status.shipped ) && (
                                                    <Button
                                                        onClick={() => {
                                                            this.shipProduct(order);
                                                        }}>
                                                        Ship Order
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            }}
                        />;
                    }}
                </Query>
            </div>
        );
    }
}

export default withApollo(Order);