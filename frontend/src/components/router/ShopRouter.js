import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../shop/Landing";
import Search from "../shop/Search";
import SignUp from "../shop/SignUp";
import SignIn from "../shop/Login";
import User from "../shop/User";
import Seller from "../shop/Seller";
import AddSeller from "../shop/AddSeller/index";
import Cart from "../shop/Cart";
import Checkout from "../shop/Checkout";
import Saved from "../shop/Saved";
import Confirm from "../shop/Confirm";
import Thanks from "../shop/Thanks";
import Feed from "../shop/Feed/Feed";
import Trending from "../shop/Trending/Trending";
import RequireAuth from "../utils/RequireAuth";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={SignIn} />

        <Route path="/search/:query/" component={Search} />
        <Route exact path="/user/:id" component={User} />
        <Route exact path="/seller/new" component={AddSeller} />
        <Route exact path="/seller/:id" component={Seller} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/confirm" component={Confirm} />
        <Route exact path="/thanks" component={Thanks} />
        <Route path="/feed/" component={Feed} />
        <Route path="/trending" component={Trending} />
      </Switch>
    </div>
  );
};

export default Router;
