import React, {Component} from 'react';
import OrderCard from "./OrderCard";


class OrderList extends Component {
    render() {
        return (
            <div className='container'>
                <h3>Order List</h3>

                <OrderCard/>
                <br/>
                <OrderCard/>
                <br/>
                <OrderCard/>
                <br/>
                <OrderCard/>

            </div>
        );
    }
}


export default OrderList;
