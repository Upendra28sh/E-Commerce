import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/admin';
import { connect } from 'react-redux';
import { Card, Row, Col, Dropdown, Steps } from 'antd';

const Step = Steps.Step;

const item = {
    date: "09-09-2018",
    id: "1004239",
    user: "Dhruv Ramdev",
    city: "Delhi",
    Total: "Rs. 37000",
    PayStatus: "PrePaid",
    age: "1d 12h",
    paymode: "COD",
    products: "Laptop",
}

 class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    status(){
        let cureentstep = 0;
    console.log("gyg",this.props.orderdetail)
        if(this.props.orderdetail.Delivered===true)
        {
             cureentstep = 3;
        }
        else if(this.props.orderdetail.Shipped===true)
        {
             cureentstep = 2;
        }
        else if(this.props.orderdetail.Packed===true)
        {
             cureentstep = 1;
             console.log("hjh");
        }
        else if(this.props.orderdetail.Confirmed===true)
        {
             cureentstep = 0;
        }

    return (<div style={{backgroundColor: 'white', marginTop: '20px'}}>
        <Steps current={cureentstep}>
            <Step title="Confirmed" description="This is a description." />
            <Step title="Packed" description="This is a description." />
            <Step title="Shipped" description="This is a description." />
            <Step title="Delivered" description="This is a description." />
        </Steps>
    </div>)
};

    value(prop,data){
            if(data==undefined)
                {
                    return null;
                }
                else if(prop=='user'){
                    return data.name
                }
                else if(prop=='products')
                {
                    let temp ="";
                    for(let i in data)
                    {
                        temp = temp+data[i].name+',';
                    }
                    return temp
                }
                else
                {
                    return data.toString()
                }
        }
    componentDidMount(){
        this.props.getOrder(this.props.match.params.id);
        
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
                {console.log("orderdetail",this.props)}
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
                                                        <td>{this.value(prop,this.props.orderdetail[prop])}</td>
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
                            {/* <Dropdown overlay={status} trigger={['click']}>
                                <span className="order-status">Order Status</span>
                            </Dropdown> */}
                            {this.status()}
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(
    state => state,
    actions
  )(OrderDetails);
  