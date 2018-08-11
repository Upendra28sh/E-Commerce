import React, {Component} from 'react';
import {Card, Row, Col,Divider,  Button} from 'antd';
import {Link} from 'react-router-dom';

const CardTitle = () => (
    <div>
        <div className="float-left">
            <Button type={'primary'}>OD1131231231231</Button>
        </div>
        <div className="float-right">
            <Button type={'ghost'}>Track</Button>
        </div>
    </div>
);

const ProductListing = () => (
    <Row>
        <Col span={3} className='text-center'>
            <img className='img-fluid'
                 src="https://img1a.flixcart.com/image/75/75/jdhp47k0/mobile/e/h/e/redmi-note-5-pro-na-original-imaf2ashnnbxxks5.jpeg"
                 alt=""/>
        </Col>
        <Col span={9}>
            <Link to={'/shop/1'}>Redmi Note 5 Pro</Link>
            <div>
                <small>Color : Black</small>
            </div>
            <div>
                <small>Seller : Black</small>
            </div>
        </Col>
        <Col span={3}>
            <div>Rs. 169999</div>
        </Col>
        <Col span={9}>
            <div>
                Delivered on Sun, Apr 8th '18
            </div>
            <small>Your item has been delivered</small>
        </Col>

    </Row>
);

const OrderFooter = ()=> (
    <div>
        Ordered on 6th August 18
        <div className="float-right">
            <strong>Order Total : </strong> Rs. 120000
        </div>
    </div>
)


class OrderCard extends Component {
    render() {
        return (
            <Card title={<CardTitle/>} className={'grey-header'}>
                <ProductListing/>
                <Divider/>
                <ProductListing/>
                <Divider/>
                <ProductListing/>
                <Divider/>
                <OrderFooter/>
            </Card>
        );
    }
}


export default OrderCard;
