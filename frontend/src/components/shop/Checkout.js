import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';

class Checkout extends React.Component {

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
                        <h1>Checkout</h1>
                    </div>
                    <div className="form_content">
                        <form onSubmit={this.handleSubmit} className="checkout_form">
                            <label htmlFor="name">E-mail</label>
                            <input type="text" id="name" name="name"/>

                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="street"/>

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city"/>

                            <label htmlFor="name">State</label>
                            <input type="text" id="state" name="state"/>

                            <label htmlFor="pin">Pin</label>
                            <input type="text" id="pin" name="pin"/>
                        </form>
                    </div>
                    <button className="submit_btn">Submit</button>
                </div>
                <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
            </div>
        );
    }
}

export default connect(
    state => state,
    actions
)(Checkout);