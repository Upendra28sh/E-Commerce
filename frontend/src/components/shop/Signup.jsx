import React from "react";
import {Button, Form, Icon, Input, message, Alert} from "antd";
import gql from "graphql-tag";
import {Mutation, withApollo} from "react-apollo";
import FacebookLogin from 'react-facebook-login';
import {FB_SIGNUP, GET_AUTH} from "../query";
import jwt from 'jsonwebtoken';

const FormItem = Form.Item;

const SIGNUP_FIRST = gql`
    mutation FirstSignup($input: NewUserInput) {
        CreateUser(input: $input) {
            token {
                code
                content
            }
        }
    }
`;

class Signup extends React.Component {
    responseFacebook = (data) => {
        const input = {
            "accessToken": data.accessToken,
            "userID": data.userID
        };
        localStorage.setItem('fb', input);
        console.log(input);
        this.props.client.mutate({
            mutation: FB_SIGNUP,
            variables: {input: input},
            update: (cache, {data: {fbSignup}}) => {
                console.log("FbSignup", fbSignup);
                let auth = {
                    isAuthenticated: fbSignup.token.code === 1,
                    user: {
                        id: "",
                        name: "",
                        username: "",
                        ...jwt.decode(fbSignup.token.content),
                        __typename: "AuthUser"
                    },
                    __typename: "Auth"
                };

                cache.writeQuery({
                    query: GET_AUTH,
                    data: {auth}
                });
            }
        }).then((data) => {
            data = data.data.fbSignup;
            console.log(data);
            if (data.token.code === 1) {
                console.log(data.token.content);
                localStorage.setItem("token", data.token.content);
                message.success("SignUp Successful");
                setTimeout(() => {
                    this.props.history.push("/signup/complete");                            
                }, 500);
                // this.props.history.push("/feed/");
            } else {
                message.error(data.token.content);
            }
        });
    };

    handleSubmit = (signupMutation) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                signupMutation({variables: {input: values}}).then(({data}) => {
                    console.log(data);
                    if (data.CreateUser.token.code === 1) {
                        console.log(data.CreateUser.token.content);
                        localStorage.setItem("token", data.CreateUser.token.content);
                        message.success("Signup Successful");
                        setTimeout(() => {
                            this.props.history.push("/signup/complete");                            
                        }, 500);
                    } else {
                        message.error(data.CreateUser.token.content);
                    }
                });
            }
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Mutation
                mutation={SIGNUP_FIRST}
                update={(cache, {data: {CreateUser}}) => {
                    console.log(CreateUser);
                    let auth = {
                        isAuthenticated: CreateUser.token.code === 1,
                        user: {
                            id: "",
                            name: "",
                            username: "",
                            ...jwt.decode(CreateUser.token.content),
                            __typename: "AuthUser"
                        },
                        __typename: "Auth"
                    };

                    cache.writeQuery({
                        query: GET_AUTH,
                        data: {auth}
                    });
                }}
            >
                {(signupMutation, {data, client}) => (
                    <div className="bg-grey">
                            <div className="form_content">
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.handleSubmit(signupMutation);
                                    }}
                                >
                                    <FormItem>
                                        {getFieldDecorator("email", {
                                            rules: [
                                                {required: true, message: "Please input your Email!"}
                                            ]
                                        })(
                                            <Input
                                                prefix={
                                                    <Icon
                                                        type="user"
                                                        style={{color: "rgba(0,0,0,.25)"}}
                                                    />
                                                }
                                                placeholder="Email"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("username", {
                                            rules: [
                                                {required: true, message: "Please input a username!"}
                                            ]
                                        })(
                                            <Input
                                                prefix={
                                                    <span
                                                        style={{color: "rgba(0,0,0,.25)", fontSize: '14px'}}
                                                    >
                                                        @
                                                    </span>
                                                }
                                                placeholder="Username"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "Please input your Password!"
                                                }
                                            ]
                                        })(
                                            <Input
                                                prefix={
                                                    <Icon
                                                        type="lock"
                                                        style={{color: "rgba(0,0,0,.25)"}}
                                                    />
                                                }
                                                type="password"
                                                placeholder="Password"
                                            />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button htmlType="submit" className="submit_btn">
                                            Sign Up
                                        </Button>
                                        {/* Or <a href="">register now!</a> */}
                                    </FormItem>
                                </Form>
                              
                                { this.state.error && <Alert
                                    message={this.state.error}
                                    type="error"
                                    closable
                                /> }
                                <div>
                                    <FacebookLogin
                                        appId="285659762264023"
                                        callback={(data) => {
                                            this.responseFacebook(data, SIGNUP_FIRST);
                                        }}
                                        icon="fa-facebook"
                                        scope="public_profile,user_friends,email"
                                        textButton="Signup with Facebook"
                                    />
                                </div>
                            </div>
                            
                    </div>
                )}
            </Mutation>
        );
    }
}

const WrappedSignup = Form.create()(Signup);

export default withApollo(WrappedSignup);
