import React from "react";
import {Switch, Route} from "react-router-dom";

import Dashboard from "../Dashboard";
import Seller from "../Seller";
import User from "../User";
import Order from "../Order";
import Product from "../Product";

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/sellers" component={Seller}/>
            <Route exact path="/users" component={User}/>
            <Route exact path="/orders" component={Order}/>
            <Route exact path="/products" component={Product}/>
        </Switch>
    );
};

export default Router;
