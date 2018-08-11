import React from 'react';

class SellerDetails extends React.Component {

    render() {
        return (
            <div>
                <div className="page_title">
                    <h2>Seller Details</h2>
                </div>

                <div className="form_content">
                    <div className="container_160">
                        <form className="checkout_form">
                            <label htmlFor="name">Seller Namer</label>
                            <input type="text" id="name" name="name"/>

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city"/>

                            <label htmlFor="state">State</label>
                            <input type="text" id="state" name="state"/>
    
                            <label htmlFor="address">Address</label>
                            <textarea id="address" name="address"/>

                            <button className="submit_btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SellerDetails;