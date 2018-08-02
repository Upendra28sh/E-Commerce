import React from 'react';
import {Progress, Input} from 'antd';

const pages = [
    (
        <div>
            <div className="page_title">
                <h2>Choose your shop name</h2>
                <p>Choose a memorable name that reflects your style.</p>
            </div>
            <div className="page_content">
                <div className="container_80">
                    <Input.Search
                        placeholder="Choose a Shop Name"
                        enterButton="Check Availability"
                        size="large"
                        onSearch={value => console.log(value)}
                    />
                    <p id="message">Shop names must have 4–20 characters.</p>
                    <p>Your shop name will appear in your shop and next to each of your listings throughout
                        Etsy. After you open your shop, you can change your name once</p>
                </div>
            </div>
        </div>
    ),
    (
        <div>
            <div className="page_title">
                <h2>Stock Your Shop</h2>
                <p>Add as many listings as you can. Ten or more would be a great start. More listings means more chances to be discovered!</p>
            </div>
            <div className="page_content">
                <h1>Page 2</h1>
            </div>
        </div>

    ),
    (
        <div>
            <div className="page_title">
                <h2>Stock Your Shop</h2>
                <p>Add as many listings as you can. Ten or more would be a great start. More listings means more chances to be discovered!</p>
            </div>
            <div className="page_content">
                <h1>Page 3</h1>
            </div>
        </div>

    ),
    (
        <div>
            <div className="page_title">
                <h2>Stock Your Shop</h2>
                <p>Add as many listings as you can. Ten or more would be a great start. More listings means more chances to be discovered!</p>
            </div>
            <div className="page_content">
                <h1>Page 4</h1>
            </div>
        </div>

    ),
];

class AddSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 25,
            page: 0
        }
    }

    onContinue = () => {
        this.setState(
            (prevState) => {
                return {
                    percent: prevState.percent += 25,
                    page: prevState.page += 1
                }
            }
        );
    }

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
                        <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                        <div id="footer">
                            <button onClick={this.onContinue}>Save and Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddSeller;