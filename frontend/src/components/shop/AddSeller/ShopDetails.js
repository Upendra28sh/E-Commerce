import React from 'react';

class ShopDetails extends React.Component {

    constructor(props) {
        super(props);
        this.showGSTInput = this.showGSTInput.bind(this);

        this.state = {
            show: false
        }
    }

    showGSTInput = (e) => {
        if (e.target.value === "true")
            this.setState(
                (prevState) => {
                    return {
                        show: !prevState.show
                    }
                }
            );
    };

    render() {
        return (
            <div>
                <div className="page_title">
                    <h2>Details</h2>
                </div>

                <div className="form_content">
                    <div className="container_160">
                        <form 
                            className="checkout_form"
                            onSubmit={
                                e => {
                                    e.preventDefault();
                                    let data = e.target;
                                    this.props.onNext(
                                        data[0].value,
                                        data[1].value,
                                        data[2].value,
                                        data[4].value,
                                    );
                                }
                            }    
                        >
                            <label htmlFor="name">Aadhar Number</label>
                            <input type="number" id="aadhar" name="aadhar"/>

                            <label htmlFor="pan">PAN Number</label>
                            <input type="number" id="pan" name="pan"/>

                            <label htmlFor="account">Account Number</label>
                            <input type="number" id="account" name="account"/>

                            <div className="gst">
                                <label htmlFor="gst">GST Registration</label>
                                <input type="checkbox" name="gst" value="true" onClick={this.showGSTInput}/> GST

                                {
                                    this.state.show ?
                                        (
                                            <div>
                                                <label htmlFor="gstNo">GST Number</label>
                                                <input type="number" id="gstNo" name="gstNo"/>
                                            </div>
                                        ) : <div></div>
                                }
                            </div>
                            <button className="submit_btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopDetails;