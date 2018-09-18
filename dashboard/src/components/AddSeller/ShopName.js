import React from 'react';
import {Input} from "antd";
import { gql } from 'apollo-boost';
import {withApollo} from 'react-apollo'

const Search = Input.Search;

class ShopName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            available: undefined,
            shopName: "",
            valid: undefined
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handleCheck(shopName) {
        console.log("Handle check called", shopName);
        this.props.client.query({
            query: gql`
                query {
                    checkShopnameAvailability(shopName: "${shopName}")
                }            
            `
        }).then(
            data => {
                this.setState(
                    () => ({
                            shopName: shopName,
                            available: data.data.checkShopnameAvailability
                    })
                )
            }
        )
    }

    handleNext() {
        this.props.onNext(this.state.shopName)   
    }

    render() {
        return (
            <div>
                <div className="page_title">
                    <h2>Choose your shop name</h2>
                    <p>Choose a memorable name that reflects your style.</p>
                </div>
                <div className="page_content">
                    <div className="container_80">
                        <Search
                            placeholder="Choose a Shop Name"
                            enterButton="Check"
                            size="large"
                            onSearch={
                                value => {
                                    if (value.trim().length > 0) {
                                        this.handleCheck(value)
                                        this.setState({valid: true})
                                    }
                                    else
                                        this.setState({valid: false})
                                }
                            }
                            defaultValue={this.props.shopName}
                        />
                        <p id="message">{this.state.valid === undefined ? "" : this.state.valid ? "" : "Enter a valid name"}</p>                        
                        <p id="message">{this.state.available === undefined ? "" : this.state.available ? "Available" : "Not Available"}</p>
                        <p>Shop names must have 4–20 characters and should not contain spaces.</p>
                    </div>
                </div>
                <div id="footer">
                    <button onClick={this.props.onBack}>Back</button>
                    <button onClick={this.handleNext} disabled={!(this.state.available && this.state.valid)}>Save and Continue</button>
                </div>
            </div>
        );
    }
};

export default withApollo(ShopName);