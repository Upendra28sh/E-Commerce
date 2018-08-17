import React, {Component} from 'react';
import OrderCard from "./OrderCard";
import OrderTable from "./OrderTable";
import { connect } from 'react-redux';
import * as actions from '../../actions/admin';

class OrderList extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        this.props.allOrders()
    }
        render() {
        return (
            <div>
                <OrderTable/>
                {/* 
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
                */}
            </div>
        );
    }
}


export default connect(
    state => state,
    actions
)(OrderList);
