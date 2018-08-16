import React from 'react';
import {Route,Switch } from 'react-router-dom';
import Details from './Details';

const RouterComponent = () => (
    <Switch>
    <Route exact path='/shop/:id' component={Details} />
    </Switch>
);

export default RouterComponent;