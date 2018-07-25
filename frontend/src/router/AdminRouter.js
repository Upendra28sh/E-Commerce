import React from 'react';
import {Switch, Route} from 'react-router-dom';

const temp = () => <p>Welcome to Seller Dashboard</p>
const login = () => <p>Login</p>

const Router = () => {
    return (
        <Switch>
            <Route exact path="/admin" component={temp} />
            <Route exact path="/admin/login" component={login} />
        </Switch>
    )
}

export default Router;