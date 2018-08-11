import React, {Component} from 'react';
import OrderCard from "./OrderCard";
import OrderTable from "./OrderTable";


class OrderList extends Component {
    render() {
        return (
            <div>
                <OrderTable/>
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
            </div>
        );
    }
}


export default OrderList;
