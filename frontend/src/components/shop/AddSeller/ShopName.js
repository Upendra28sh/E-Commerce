import React from 'react';
import {Input} from "antd";
import ApolloClient, { gql } from 'apollo-boost';

const Search = Input.Search;

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

class ShopName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            available: undefined,
            shopname: ""
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDone = this.handleDone.bind(this);
    }

    handleCheck(shopname) {
        console.log("Handle check called", shopname);
        client.query({
            query: gql`
                query {
                    checkShopnameAvailability(shopname: "${shopname}")
                }            
            `
        }).then(
            data => {
                this.setState(
                    () => {
                        return {
                            shopname: shopname,
                            available: data.data.checkShopnameAvailability
                        }
                    }
                )
            }
        )
    }

    handleDone() {
        this.props.onNext(this.state.shopname)
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
                            onSearch={value => this.handleCheck(value)}
                        />
                        {this.state.available ? <button onClick={this.handleDone}>Done</button> : <div></div>}
                        <p id="message">{this.state.available === undefined ? "" : this.state.available ? "Available" : "Not Available"}</p>
                        <p>Shop names must have 4–20 characters and should not contain spaces.</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default ShopName;