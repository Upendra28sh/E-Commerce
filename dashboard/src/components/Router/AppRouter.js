import React from "react";
import {Switch, Route} from "react-router-dom";

import Dashboard from "../Dashboard";
// import Seller from "../Seller";
import User from "../User";
import Order from "../Order";
import OrderShip from "../OrderShip";
import Product from "../Product";
import NewProduct from "../AddProduct/NewProduct";
import Posts from '../Posts';
import Chat from '../Chat';
import Profile from '../Profile/Profile';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            {/*<Route exact path="/sellers" component={Seller}/>*/}
            <Route exact path="/users" component={User}/>
            <Route exact path="/orders" component={Order}/>
            <Route exact path="/orders/:id/ship" component={OrderShip} />
            <Route exact path="/products" component={Product}/>
            <Route exact path="/chats" component={Chat}/>
            <Route exact path="/product/new" component={NewProduct}/>
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/profile" component={Profile} />
        </Switch>
    );
};

export default Router;
