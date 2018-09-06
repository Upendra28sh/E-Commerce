import React from 'react';
import {Progress, Input} from 'antd';
import ApolloClient, {gql} from 'apollo-boost';
import { ADD_SELLER } from '../Query/query';

import ShopName from "./ShopName";
import SellerDetails from './SellerDetails';
import ShopDetails from './ShopDetails';
import ShopPolicy from './ShopPolicy';

const client = new ApolloClient({
    uri: "http://localhost:4000"
});

class AddSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 25,
            page: 0,
            shopName: "",
            name: "",
            image: "",
            about: "",
            intro:"",
            address: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            aadhar: null,
            pan: null,
            gst: null,
            accountNo: null,
            bankName: "",
            bankIFSC: "",
            returnPolicy: "",
            storePolicy: ""
        }
    }

    prepareInput() {
        return {
            "input" : {
                "name": this.state.name,
                "shopName": this.state.shopName,
                "image": this.state.image,
                "about": this.state.about,
                "intro": this.state.intro,
                "address":{
                    "address": this.state.address,
                    "street": this.state.street,
                    "city": this.state.city,
                    "state": this.state.state,
                    "zipcode": this.state.zipcode
                },
                "legal":{
                    "pan": this.state.pan,
                    "aadhar": this.state.aadhar,
                    "gst": this.state.gst,
                    "bank": {
                        "name": this.state.bankName,
                        "accountNumber": this.state.accountNo,
                        "ifscCode": this.state.bankIFSC
                    }
                },
                "policy":{
                    "store": this.state.storePolicy,
                    "return": this.state.returnPolicy
                }
            }
        }
    }

    submitDetails = () => {
        let inputToGraph = this.prepareInput();
        console.log(inputToGraph);
        client.mutate({
            mutation: ADD_SELLER,
            variables: inputToGraph
        }).then(
            data => {
                console.log(data);
                this.props.history.push(`/seller/${this.state.shopName}`);
            }
        );
    }

    onContinue = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent < 100)
                    return {
                        percent: prevState.percent += 25,
                        page: prevState.page += 1
                    }
            }
        );

        if (this.state.percent === 100)
        {
            this.submitDetails();
        }    
    };

    onBack = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent > 25)
                    return {
                        percent: prevState.percent -= 25,
                        page: prevState.page -= 1
                    }
            }
        );
    };

    onSetShopName = (shopName) => {
        this.setState(
            () => ({
                shopName: shopName
            })
        );
    }

    onSetSellerDetails = (name, image, intro, address, street, city, state, zipcode) => {
        console.log(name,image,intro);
        this.setState(
            () => ({
                name: name,
                image: image,
                intro: intro,
                address: address,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode
            })
        )
        this.onContinue();
    }

    onSetShopDetails = (aadhar, pan, gst, bankName, accountNo, bankIFSC) => {
        this.setState(
            () => ({
                aadhar: aadhar,
                pan: pan,
                gst: gst,
                bankName: bankName,
                accountNo: accountNo,
                bankIFSC: bankIFSC
            })
        );
        this.onContinue();
    }

    onSetShopPolicy = (returnPolicy, storePolicy,about) => {
        this.setState(
            () => ({
               returnPolicy: returnPolicy,
               storePolicy: storePolicy,
               about : about
            })
        );
    }

    render() {
        const pages = [
            <ShopName onNext={this.onSetShopName} {...this.state}/>,
            <SellerDetails onNext={this.onSetSellerDetails} {...this.state}/>,
            <ShopDetails onNext={this.onSetShopDetails} {...this.state}/>,
            <ShopPolicy onNext={this.onSetShopPolicy} {...this.state}/>
        ];
        
        return (
            <main>
                {console.log(this.state)}
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
            </main>
        );
    }
};

export default AddSeller;