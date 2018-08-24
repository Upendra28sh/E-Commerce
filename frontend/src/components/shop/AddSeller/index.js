import React from 'react';
import {Progress, Input} from 'antd';
import ApolloClient, {gql} from 'apollo-boost';

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
            shopname: "",
            name: "",
            image: "",
            about: "",
            address: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            aadhar: null,
            pan: null,
            account: null,
            gst: null,
            returnPolicy: "",
            storePolicy: ""
        }
    }

    submitDetails = () => {
        console.log(this.state);
        let {shopname, name, image, about, address, street, city, state, zipcode, aadhar, pan, account, gst, returnPolicy, storePolicy} = this.state;
        client.mutate({
            mutation: gql `
                mutation {
                    addSeller(
                        input:{
                            name: "${name}",
                            shopname: "${shopname}",
                            image: "${image}",
                            about: "${about}",
                            address:{
                                address: "${address}",
                                street: "${street}",
                                city: "${city}",
                                state: "${state}",
                                zipcode: ${zipcode}
                            },
                            legalInfo:{
                                pan: "${pan}",
                                aadhar: "${aadhar}",
                                gst: "${gst}",
                                bank: "${account}"
                            },
                            policy:{
                                store: "${storePolicy}",
                                return: "${returnPolicy}"
                            }
                        }) {
                            name
                            image
                            id
                            about
                            shopname
                            address {
                                address
                                street
                                city
                                state
                                zipcode
                            }
                            legalInfo {
                                pan
                                aadhar
                                gst
                                bank
                            }
                            policy {
                                store
                                return
                            }
                        }
                    }         
            `
        });
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
    };

    // onBack = () => {
    //     this.setState(
    //         (prevState) => {
    //             if (prevState.percent > 25)
    //                 return {
    //                     percent: prevState.percent -= 25,
    //                     page: prevState.page -= 1
    //                 }
    //         }
    //     );
    // };

    onSetShopName = (shopname) => {
        this.setState(
            () => ({
                shopname: shopname
            })
        );
        this.onContinue();
    }

    onSetSellerDetails = (name, image, about, address, street, city, state, zipcode) => {
        this.setState(
            () => ({
                name: name,
                image: image,
                about: about,
                address: address,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode
            })
        )
        this.onContinue();
    }

    onSetShopDetails = (aadhar, pan, account, gst) => {
        this.setState(
            () => ({
                aadhar: aadhar,
                pan: pan,
                account: account,
                gst: gst
            })
        );
        this.onContinue();
    }

    onSetShopPolicy = (returnPolicy, storePolicy) => {
        this.setState(
            () => ({
               returnPolicy: returnPolicy,
               storePolicy: storePolicy
            })
        );
    }

    componentWillUnmount() {
        this.submitDetails();
    }

    render() {
        const pages = [
            <ShopName onNext={this.onSetShopName}/>,
            <SellerDetails onNext={this.onSetSellerDetails}/>,
            <ShopDetails onNext={this.onSetShopDetails}/>,
            <ShopPolicy onNext={this.onSetShopPolicy}/>
        ];
        
        return (
            <div>
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
                            {/* <button onClick={this.onBack}>Back</button> */}
                            {/* <button onClick={this.onContinue}>Save and Continue</button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddSeller;