import React from "react";
import {Switch, Route} from "react-router-dom";

import Login from '../Login';
import AddSeller from '../AddSeller/index';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/shop/login" component={Login}/>
            <Route exact path="/shop/create" component={AddSeller} />
        </Switch>
    );
};

export default Router;
