import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProductList from "../components/admin/ProductList.jsx";
import OrderList from "../components/admin/OrderList";

const temp = () => <p>Welcome to Seller Dashboard</p>
const login = () => <p>Login</p>

const Router = () => {
    return (
        <Switch>
            <Route exact path="/admin" component={temp} />
            <Route exact path="/admin/login" component={login} />
            <Route exact path="/admin/listings" component={ProductList} />
            <Route exact path="/admin/listing/:id" component={ProductList} />
            <Route exact path="/admin/orders/" component={OrderList} />
        </Switch>
    )
}

export default Router;