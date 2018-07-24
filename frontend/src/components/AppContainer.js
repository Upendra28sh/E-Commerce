import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/home';
import Router from '../router/AppRouter';
import Header from './Header'

class AppContainer extends React.Component {

    render() {
        return (
            <div>
                {console.log(this.props)}
                {
                    this.props.token ?
                        <p className="userName">Hi, {this.props.first_name}</p> :
                        <div></div>
                }
                
                <Header 
                    logout={this.props.logout}
                    toggleLogin={this.props.toggleLogin}
                    shopping_cart={this.props.shopping_cart}
                    history={this.props.history}
                />

                {this.props.showLogin ?
                    <div className="login">
                        Email: <input onChange={(event) => this.props.typing(event, 'email')} type="text"></input>
                        Password: <input onChange={(event) => this.props.typing(event, 'password')}type="password"></input>
                        <button onClick={()=> this.props.submitLogin(this.props.email, this.props.password)}>Submit</button>
                    </div> : <div></div>}

                <div className="container">
                    <Router />
                </div>
            </div>
        )
    }
}

const AppContainerContainer = connect(
    state => state,
    actions
)(AppContainer);

export default AppContainerContainer;
