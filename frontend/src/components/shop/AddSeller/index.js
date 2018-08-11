import React from 'react';
import {Progress, Input} from 'antd';

import ShopName from "./ShopName";
import ShopDetails from './ShopDetails';
import SellerDetails from './SellerDetails';

const pages = [
    <ShopName />,
    <SellerDetails />,
    <ShopDetails />,
];

class AddSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 100/3,
            page: 0,
            gst: false
        }
    }

    onContinue = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent < 100)
                    return {
                        percent: prevState.percent += 100/3,
                        page: prevState.page += 1
                    }
            }
        );
    };

    onBack = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent > 100/3)
                    return {
                        percent: prevState.percent -= 100/3,
                        page: prevState.page -= 1
                    }
            }
        );
    };

    render() {
        return (
            <div>
                <div className="container_40">
                    <div id="progress">
                        <Progress showInfo={false} percent={this.state.percent}/>
                    </div>
                </div>
                <div className="bg-grey">
                    <div className="container_40">
                        {pages[this.state.page]}
                        <p style={{paddingTop: '20px', paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                        <div id="footer">
                            <button onClick={this.onBack}>Back</button>
                            <button onClick={this.onContinue}>Save and Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddSeller;