import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

const item = {
    date: "09-09-2018",
    id: "1004239",
    name: "Dhruv Ramdev",
    city: "Delhi",
    total: "Rs. 3700",
    status: "PrePaid",
    age: "1d 12h"
}

export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const header = (
            <div className="order_header">
                <span className="order_header__title">Order Details</span>
                <span className="order_header__id">{this.props.match.params.id}</span>
            </div>
        );

        return (
            <div>
                {console.log(this.props)}
                <Card title={header} style={{ width: '50%', margin: 'auto' }}>
                    <div className="order">
                        <Row>
                            <Col span={16} className="order__details">
                                <div>
                                    <table className="order__details">
                                       {
                                            Object.keys(item).map(
                                                prop => (
                                                    <tr>
                                                        <th>{prop.toUpperCase()}</th>
                                                        <td>{item[prop]}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </table>
                                    
                                </div>
                            </Col>
                            <Col span={8}>
                                <img src="http://shfcs.org/en/wp-content/uploads/2015/11/MedRes_Product-presentation-2.jpg" alt={item.name}/>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}