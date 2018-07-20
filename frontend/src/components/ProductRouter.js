import React from 'react';
import {Route, Switch } from 'react-router-dom';
import Details from './Details';

const temp = () => <h1>Saurabh is this component</h1>

const RouterComponent = () => (
    <Route exact path='/shop/:id' component={Details} />
);

export default RouterComponent;