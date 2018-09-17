import React, {Component} from 'react';
import {Card, Row, Col, Divider, Button} from 'antd';
import {Link} from 'react-router-dom';

const CardTitle = (props) => (
    <div>
        <div className="float-left">
            <Link to={`/order/${props.order.order_number}/`}>
                <Button className='theme_button'>OD{props.order.order_number}</Button>
            </Link>
        </div>
        <div className="float-right">
            <Button type={'ghost'}>Track</Button>
        </div>
    </div>
);

const ProductListing = (props) => (
    <Row>
        <Col span={3} className='text-center'>
            <img className='img-fluid'
                 src={`${props.product.product.image}`}
                 alt={props.product.product.name}/>
        </Col>
        <Col span={1}/>
        <Col span={8}>
            <Link to={'/product/' + props.product.product.id}>{props.product.product.name}</Link>
            {props.product.selectedSize !== "undefined" && (
                <div>
                    <small>Size : {props.product.selectedSize}</small>
                </div>
            )}
            <div>
                <small>Quantity : {props.product.itemCount}</small>
            </div>
        </Col>
        <Col span={3}>
            <div>Rs. {props.product.product.price}</div>
        </Col>
        <Col span={9}>
            <div>
                Delivered on Sun, Apr 8th '18
            </div>
            <small>Your item has been delivered</small>
        </Col>

    </Row>
);

const OrderFooter = (props) => (
    <div>
        Ordered on 6th August 18
        <div className="float-right">
            <strong>Order Total : </strong> Rs.{props.total}
        </div>
    </div>
);

class OrderListCard extends Component {

    constructor(props) {
        super(props);
        // console.log(this.props.order);
    }

    render() {

        const data = this.props.order;
        console.log(data);

        return (
            <Card title={<CardTitle order={data}/>} className={'grey-header'} style={{marginBottom: 20}}>
                {
                    data.products.map(
                        (product, index) => (
                            <div key={index}>
                                <ProductListing product={product}/>
                                <Divider/>
                            </div>
                        )
                    )
                }
                <OrderFooter total={data.total}/>
            </Card>
        );
    }
}


export default OrderListCard;
