import React from 'react';
import {Link} from 'react-router-dom';
import {Progress, Input} from 'antd';
import { ADD_SELLER } from '../Query/query';
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import ShopName from "./ShopName";
import SellerDetails from './SellerDetails';
import ShopDetails from './ShopDetails';
import ShopPolicy from './ShopPolicy';
const BASE_URL = 'http://localhost:4000/graphql' ;
let token = localStorage.getItem("token");
const client = new ApolloClient({
  link: createUploadLink({ uri: BASE_URL,
  headers: {authorization: token ? `Bearer ${token}` : "",}
  }),
  cache: new InMemoryCache()
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
            password:"",
            about: "",
            intro:"",
            address: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            aadhar: null,
            aadhar_image:"",
            pan_image:"",
            cancelled_cheque:"",
            pan: null,
            gst: null,
            accountNo: null,
            bankName: "",
            bankIFSC: "",
            returnPolicy: "",
            storePolicy: ""
        }

        this.submitDetails = this.submitDetails.bind(this);

    }
    // handlepanfileChange = ({ fileList }) => this.setState({ pan_image:fileList[0] });
    // handleaadharfileChange = ({ fileList }) => this.setState({ aadhar_image:fileList[0] });
    // handlechequefileChange = ({ fileList }) => this.setState({ cancelled_cheque:fileList[0] });


    prepareInput() {
        return {
            "input" : {
                "name": this.state.name,
                "shopName": this.state.shopName,
                "image": this.state.image,
                "about": this.state.about,
                "password":this.state.password,
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
                    "pan_image":this.state.pan_image,
                    "aadhar": this.state.aadhar,
                    "aadhar_image":this.state.aadhar_image,
                    "gst": this.state.gst,
                    "cancelled_cheque":this.state.cancelled_cheque,
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
        console.log(this.state);
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

        // if (this.state.percent === 100)
        // {
        //     this.submitDetails();
        // }    
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
        this.onContinue();
    }

    onSetSellerDetails = (name, image, intro,password, address, street, city, state, zipcode) => {
        console.log(name,image,intro);
        this.setState(
            () => ({
                name: name,
                image: image[0].originFileObj,
                intro: intro,
                password:password,
                address: address,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode
            })
        )
        this.onContinue();
    }

    onSetShopDetails = (aadhar,aadhar_image, pan,pan_image, gst, bankName, accountNo, bankIFSC,cancelled_cheque) => {
        this.setState(
            () => ({
                aadhar: aadhar,
                aadhar_image:aadhar_image[0].originFileObj,
                pan: pan,
                pan_image:pan_image[0].originFileObj,
                gst: gst,
                bankName: bankName,
                accountNo: accountNo,
                bankIFSC: bankIFSC,
                cancelled_cheque:cancelled_cheque[0].originFileObj,
            })
        );
        this.onContinue();
    }

    onSetShopPolicy = (returnPolicy, storePolicy, about) => {
        this.setState(
            () => ({
               returnPolicy: returnPolicy,
               storePolicy: storePolicy,
               about : about
            }),
            () => this.submitDetails()
        )
        // this.submitDetails();
    }

    render() {
        const pages = [
            <ShopName onBack={this.onBack} onNext={this.onSetShopName} {...this.state}/>,
            <SellerDetails onBack={this.onBack} onNext={this.onSetSellerDetails} {...this.state}/>,
            <ShopDetails onBack={this.onBack} onNext={this.onSetShopDetails} {...this.state}/>,
            <ShopPolicy onBack={this.onBack}  onNext={this.onSetShopPolicy} {...this.state}/>
        ];
        
        return (
            <div>
            <Link to="/shop/login"><button className="register btn btn-default">Login</button></Link>
            <br />
            <main className="container_80">
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
                        {/* <div id="footer">
                            <button onClick={this.onBack}>Back</button>
                            <button onClick={this.onContinue}>Save and Continue</button>
                        </div> */}
                    </div>
                </div>
            </main>
            </div>
        );
    }
};

export default AddSeller;