import React from 'react';
import Router from '../../router/AdminRouter'; 

class Container extends React.Component {
    render() {
        return (
            <div>
                <h1>Admin Panel</h1>
                <div className="container">
                    <Router />
                </div>
                <p>Footer</p>
            </div>
        );
    }
}

export default Container;