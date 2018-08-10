import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
    }

    render() {
        return (
            <div className="bg-grey">
                <div className="container_320">
                    <div className="form_title">
                        <h1>Sign In</h1>
                    </div>
                    <div className="form_content">
                        <form onSubmit={this.handleSubmit} className="checkout_form">
                            <label htmlFor="email">E-mail</label>
                            <input type="text" id="email" name="email"/>

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password"/>
                        </form>
                    </div>
                    <button className="submit_btn">Login</button>
                </div>
                <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
            </div>
        );
    }
}

export default connect(
    state => state,
    actions
)(SignIn);