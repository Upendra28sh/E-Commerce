import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Landing from './Landing';
import Home from './Home';
import SignUp from './SignUp';
import Cart from './Cart';
import Confirm from './Confirm';
import Thanks from './Thanks';

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/shop" component={Home} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/thanks" component={Thanks} />
        </Switch>
    )
}

export default Router;