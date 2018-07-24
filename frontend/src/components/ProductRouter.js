import React from 'react';
import {Route } from 'react-router-dom';
import Details from './Details';

const RouterComponent = () => (
    <Route exact path='/shop/:id' component={Details} />
);

export default RouterComponent;