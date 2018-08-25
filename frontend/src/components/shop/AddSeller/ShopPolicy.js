import React from 'react';

class ShopPolicy extends React.Component {

    render() {
        return (
            <div>
                <div className="page_title">
                    <h2>Shop Policy</h2>
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
                                        data[1].value
                                    );
                                }
                            }    
                        >
                            <label htmlFor="return_policy">Return Policy</label>
                            <textarea id="return_policy" name="return_policy"/>

                            <label htmlFor="store_policy">Store Policy</label>
                            <textarea id="store_policy" name="store_policy"/>

                            <button className="submit_btn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopPolicy;