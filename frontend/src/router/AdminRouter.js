import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProductList from "../components/admin/ProductList.jsx";
import ProductDetails from "../components/admin/ProductDetails";
import ProductNew from "../components/admin/ProductNew";
import OrderList from "../components/admin/OrderList";
import OrderDetails from "../components/admin/OrderDetails";
import UserTable from '../components/admin/UserTable';

const temp = () => <p>Welcome to Seller Dashboard</p>
const login = () => <p>Login</p>

const Router = () => {
    return (
        <Switch>
            <Route exact path="/admin" component={temp} />
            <Route exact path="/admin/login" component={login} />
            <Route exact path="/admin/listings" component={ProductList} />
            <Route exact path="/admin/listings/new" component={ProductNew} />
            <Route exact path="/admin/listing/:id" component={ProductDetails} />
            <Route exact path="/admin/orders/" component={OrderList} />
            <Route exact path="/admin/orders/:id" component={OrderDetails} />
            <Route exact path="/admin/users/" component={UserTable} />
        </Switch>
    )
}

export default Router;