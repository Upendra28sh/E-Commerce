import React from 'react';
import {Redirect} from 'react-router-dom' ;

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        render() {
            if (!this.props.isAuthenticated) {
                return <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: this.props.location}
                    }}
                />
            } else {
                return (
                    <ComposedComponent {...this.props} />
                );
            }

        }
    }

    return Authenticate;
}
