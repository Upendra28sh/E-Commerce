import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <ul className="nav">
            <img src="/like.svg" className="header__logo"/>
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li>{props.token ?
                <Link onClick={props.logout} to="">Log Out</Link> :
                <Link onClick={props.toggleLogin} to="">Log In</Link> }
            </li>
            <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>

            {
                props.shopping_cart.length < 0 ?
                    <div className="cart">
                        <Link to="/cart">
                            <img src="/shopping-cart.svg"></img>
                            <div>{props.shopping_cart.length}</div>
                        </Link>
                    </div> :
                    <div></div>
            }

        </ul>
    );
}

export default Header;