import React, {Component} from 'react';
import {Card, Row, Col, Divider, Button} from 'antd';
import {Link} from 'react-router-dom';

const CardTitle = (props) => (
    <div style={{width: '100%'}}>
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

const StatusRender = ({product}) => {
    console.log(product.status);
    if (!product.status.confirmed) {
        return (
            <div>
                <div>Product is under process</div>
                <small>Seller will confirm your order</small>
            </div>
        );
    } else if (product.status.confirmed) {
        return (
            <div>
                <div> Product is confirmed</div>
                <small>Seller will ship your order</small>
            </div>
        );
    } else if (product.status.shipped) {
        return (
            <div>
                <div> Product is being Delivered</div>
                <small>Product is with our shipping partner</small>
            </div>
        );
    } else if (product.status.delivered) {
        return (
            <div>
                <div>Product is Delivered</div>
            </div>
        );
    }
};

const ProductListing = ({product}) => (
    <Row>
        <Col span={3} className='text-center'>
            <img className='img-fluid'
                 src={`${product.product.image}`}
                 alt={product.product.name}/>
        </Col>
        <Col span={1}/>
        <Col span={8}>
            <Link to={'/product/' + product.product.id}>{product.product.name}</Link>
            {product.selectedSize !== "undefined" && (
                <div>
                    <small>Size : {product.selectedSize}</small>
                </div>
            )}
            <div>
                <small>Quantity : {product.itemCount}</small>
            </div>
        </Col>
        <Col span={3}>
            <div>Rs. {product.product.price}</div>
        </Col>
        <Col span={9}>
            <StatusRender product={product}/>
        </Col>

    </Row>
);

const OrderFooter = (props) => (
    <div>
        Ordered on {new Date(1538518100405).toLocaleString()}
        <div className="float-right">
            <strong>Order Total : </strong> Rs.{props.total}
        </div>
    </div>
);

class OrderListCard extends Component {
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
