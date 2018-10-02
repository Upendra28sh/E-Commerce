import React from 'react';
import {Steps, Icon, Card, Alert, message} from "antd";
import {withApollo} from 'react-apollo';
import {gql} from 'apollo-boost';
import BasicDetails from "./SignUpComplete/BasicDetails";
import AddressDetails from "./SignUpComplete/AddressDetails";

const Step = Steps.Step;

const COMPLETE_SIGNUP = gql`
    mutation($details : UserDetailsInput , $address : AddressInput ) {
        CompleteSignup(details :$details , address :$address) {
            token {
                code
                content
            }
        }
    }
`;

class SignupComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            name: '',
            image: '',
            about: '',
            address: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
        };
    }

    getContent() {
        switch (this.state.current) {
            case 0:
                return <BasicDetails 
                            onChange={this.onChange.bind(this)} 
                            onNext={this.onNext.bind(this)}
                            onPrev={this.onPrev.bind(this)} 
                            {...this.state}
                        />;
            case 1:
                return <AddressDetails 
                            onChange={this.onChange.bind(this)} 
                            onNext={this.onSubmit.bind(this)}
                            onPrev={this.onPrev.bind(this)}  
                            {...this.state}
                        />;
        }
    }
 
    prepareInput() {
        return {
            "details": {
                "name": this.state.name,
                "image": this.state.image,
                "about": this.state.about,
                "username": this.state.username
            },
            "address": {
                "address": this.state.address,
                "street": this.state.street,
                "city": this.state.city,
                "state": this.state.state,
                "zipcode": this.state.zipcode
            }
        };
    }


    onSubmit() {
        let inputToGraphQL = this.prepareInput();
        this.props.client.mutate({
            mutation: COMPLETE_SIGNUP,
            variables: inputToGraphQL
        }).then(({data}) => {
            data = data.CompleteSignup;
            console.log(data);
            if (data.token.code === 1) {
                console.log(data.token.content);
                localStorage.setItem("token", data.token.content);
                message.success("SignUp Successful");
                window.location.reload();
                this.props.history.push("/feed/");
            }
        });
        console.log(inputToGraphQL);
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    onNext() {
        let current = this.state.current;
        this.setState({
            current: current + 1
        });
    }

    onPrev() {
        let current = this.state.current;
        this.setState({
            current: current - 1
        });
    }

    render() {
        return (
            <div>
                <div className='sign_up'>
                    <div className="container">
                    <Alert
                        message="Finish Signup"
                        description="You have to finish your signup details."
                        type="info"
                        iconType="profile"
                        showIcon    
                        style={{marginTop: '50px'}}
                    />
                        <Card className='sign_up__card'>
                            {console.log(this.state)}
                            <div className="container_40">
                                <div style={{paddingBottom: '20px'}}>
                                    <Steps progressDot current={this.state.current}>
                                        <Step
                                            title="Basic Info"
                                            // description="Your basic details."
                                        />
                                        <Step
                                            title="Address Info"
                                            // description="You address."
                                        />
                                    </Steps>
                                </div>
                            </div>
                            {this.getContent()}
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withApollo(SignupComplete);