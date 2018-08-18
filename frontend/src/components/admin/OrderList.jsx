import React, {Component} from 'react';
import OrderCard from "./_deprecated/OrderCard";
import OrderTable from "./OrderTable";

import {Query} from 'react-apollo' ;
import gql from 'graphql-tag';

const GET_ORDERS = gql`
    {
        allOrders {
            id,
            user {
                name
            }
            shipping,
            discount,
            date,
            Total,
            paymode,
            city,
            Confirmed,
            Packed,
            Shipped,
            Delivered,
            PayStatus
        }
    }
`;


class OrderList extends Component {

    render() {
        return (
            <Query query={GET_ORDERS}>
                {({loading, error, data}) => {
                    if (loading) return <h2>Loading</h2>;
                    if (error) return <h2>Err.</h2>;

                    return <OrderTable orders={data.allOrders}/>;
                }}

            </Query>
        );
    }
}


export default OrderList;
