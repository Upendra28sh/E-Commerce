import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd';
import Router from './Router/DefaultRouter';

class DefaultContainer extends React.Component {
    render() {
        return (
            <div>
                <div className="header">
                    <div className="header__brand">
                        <img src="http://pngimg.com/uploads/microsoft/microsoft_PNG10.png" alt="Logo"/>
                    </div>
                    <NavLink to="/shop/login"><div className="header__item">Log In</div></NavLink>
                    <NavLink to="/shop/create"><div className="header__item">Sign Up</div></NavLink>
                </div>
                <div className="container_80">
                    <Router />
                </div>
            </div>
        );
    }
}

export default DefaultContainer;