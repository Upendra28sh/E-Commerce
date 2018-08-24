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
                        <form 
                            className="checkout_form" 
                            onSubmit={
                                e => {
                                    e.preventDefault();
                                    let data = e.target;
                                    // console.log(data);
                                    this.props.onNext(
                                        data[0].value,
                                        data[1].value,
                                        data[2].value,
                                        data[3].value,
                                        data[4].value,
                                        data[5].value,
                                        data[6].value,
                                        data[7].value
                                    );
                                }
                            }
                        >
                            <label htmlFor="name">Seller Name</label>
                            <input type="text" id="name" name="name"/>

                            <label htmlFor="name">Image</label>
                            <input type="text" id="image" name="image"/>

                            <label htmlFor="name">About</label>
                            <input type="text" id="about" name="about"/>

                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address"/>

                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" name="street"/>

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city"/>

                            <label htmlFor="state">State</label>
                            <input type="text" id="state" name="state"/>

                            <label htmlFor="zipcode">Address</label>
                            <input type="number" id="zipcode" name="zipcode"/>    

                            <button className="submit_btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SellerDetails;