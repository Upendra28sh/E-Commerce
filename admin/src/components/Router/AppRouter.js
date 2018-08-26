import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from '../Dashboard';
import Seller from '../Seller';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/sellers" component={Seller} />
        </Switch>
    );
};

export default Router;
