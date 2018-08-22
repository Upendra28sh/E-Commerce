import React from 'react';

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let address = e.target[0].value;
        let street = e.target[1].value;
        let city = e.target[2].value;
        let state = e.target[3].value;
        let zip = e.target[4].value;

        console.log(address, street, city, state, zip);
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

                            <label htmlFor="address">Address</label>    
                            <input type="text" id="address" name="address"/>
                            
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="street"/>

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city"/>

                            <label htmlFor="name">State</label>
                            <input type="text" id="state" name="state"/>

                            <label htmlFor="pin">Zip</label>
                            <input type="number" id="zip" name="zip"/>
                            
                            <button type="submit" className="submit_btn">Submit</button>
                        </form>
                    </div>
                </div>
                <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
            </div>
        );
    }
}

export default Checkout;