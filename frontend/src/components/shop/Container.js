import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';
import Router from '../../router/ShopRouter';
import Header from './Header'
class Container extends React.Component {

    render() {
        return (
            <div>
                
                
                <Header {...this.props}
                />

                 {this.props.showLogin ?
                    <div className="login">
                        Email: <input onChange={(event) => this.props.typing(event, 'email')} type="text"></input>
                        Password: <input onChange={(event) => this.props.typing(event, 'password')}type="password"></input>
                        <button onClick={()=> this.props.submitLogin(this.props.email, this.props.password)}>Submit</button>
                    </div> : <div></div>}
                <div>
                    <Router/>
                </div>
            </div>
        )
    }
}

const ContainerContainer = connect(
    state => state,
    actions
)(Container);

export default ContainerContainer;
