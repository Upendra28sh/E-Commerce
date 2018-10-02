import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "../shop/Landing";
import Search from "../shop/Search";
// import SignUp from "../shop/SignUp";
// import SignIn from "../shop/Login";
import User from "../shop/User";
import Seller from "../shop/Seller";
// import AddSeller from "../shop/AddSeller/index";
import Cart from "../shop/Cart";
import CheckoutShipping from "../shop/Checkout/CheckoutShipping";
import Wishlist from "../shop/Wishlist";
// import Confirm from "../shop/Confirm";
// import Thanks from "../shop/Thanks";
import Feed from "../shop/Feed/CombinedFeed";
import Trending from "../shop/Trending/Trending";
import OrderList from "../shop/Order/OrderList";
import RequireAuth from "../utils/RequireAuth";
import TrendingFeed from "../shop/TrendingFeed";
// import addPost from "../shop/addpost"
import Chat from "../shop/Chat"
import CheckoutReview from "../shop/Checkout/CheckoutReview";
import CheckoutSubmit from "../shop/Checkout/CheckoutSubmit";
import Order from "../shop/Order/Order";
import FeedDetail from "../shop/Feed/FeedDetail";
import SignupComplete from "../shop/SignupComplete";
import FacebookConnect from "../shop/FacbookConnect";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/chat" component={RequireAuth(Chat)}/>
        {/* <Route exact path="/signup" component={SignUp} /> */}
        <Route exact path="/signup/complete" component={RequireAuth(SignupComplete)} />
        {/* <Route exact path="/login" component={SignIn} /> */}
        {/*<Route exact path="/addPost" component={addPost}/>*/}
        <Route exact path="/facebook" component={RequireAuth(FacebookConnect)} />
        <Route exact path="/trendingfeed" component={RequireAuth(TrendingFeed)}/>
        <Route path="/search/:query/" component={RequireAuth(Search)} />
        <Route exact path="/user/:id" component={RequireAuth(User)} />
        {/*<Route exact path="/seller/new" component={RequireAuth(AddSeller)} />*/}
        <Route  path="/shop/:id/" component={RequireAuth(Seller)} />
        <Route exact path="/cart" component={RequireAuth(Cart)} />
        <Route path="/checkout/shipping" component={RequireAuth(CheckoutShipping)} />
        <Route path="/checkout/review" component={RequireAuth(CheckoutReview)} />
        <Route path="/checkout/submit" component={RequireAuth(CheckoutSubmit)} />
        <Route exact path="/wishlist" component={RequireAuth(Wishlist)} />
        {/* <Route exact path="/confirm" component={RequireAuth(Confirm)} />
        <Route exact path="/thanks" component={RequireAuth(Thanks)} /> */}
        <Route exact path="/orders" component={RequireAuth(OrderList)} />
        <Route path="/order/:order_number" component={RequireAuth(Order)} />
        <Route path="/feed/:id" component={RequireAuth(FeedDetail)} />
        <Route path="/feed/" component={RequireAuth(Feed)} />
        <Route path="/trending" component={RequireAuth(Trending)} />
      </Switch>
    </div>
  );
};

export default Router;
