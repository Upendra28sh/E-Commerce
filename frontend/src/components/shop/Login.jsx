import React from "react";
import {Button, Form, Icon, Input, message} from "antd";
import {Mutation, withApollo} from "react-apollo";
import jwt from "jsonwebtoken";
import FacebookLogin from 'react-facebook-login';
import {FB_SIGNIN, GET_AUTH, LOGIN_MUTATION} from "../query";

const FormItem = Form.Item;

class Login extends React.Component {
    responseFacebook = (data) => {
        const input = {
            "accessToken": data.accessToken,
            "userID": data.userID
        };
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userID', data.userID);
        this.props.client.mutate({
            mutation: FB_SIGNIN,
            variables: {input: input},
            update: (cache, {data: {fbSignin}}) => {
                console.log(fbSignin);
                let auth = {
                    isAuthenticated: fbSignin.token.code === 1,
                    user: {
                        id: "",
                        name: "",
                        username: "",
                        ...jwt.decode(fbSignin.token.content),
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
            // console.log(data);
            data = data.data.fbSignin;
            // console.log(data);
            if (data.token.code === 1) {
                console.log(data.token.content);
                localStorage.setItem("token", data.token.content);
                message.success("Login Successful");
                setTimeout(() => {
                    this.props.history.push("/feed/");
                } , 500);
            } else {
                message.error(data.token.content);
            }
        });
    };
    handleSubmit = (loginMutation, client) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                loginMutation({variables: {input: values}}).then(({data}) => {
                    if (data.UserLogin.token.code === 1) {
                        console.log(data.UserLogin.token.content);
                        localStorage.setItem("token", data.UserLogin.token.content);
                        message.success("Login Successful");
                        setTimeout(() => {
                            this.props.history.push("/feed/");                            
                        } , 500);
                    } else {
                        message.error(data.UserLogin.token.content);
                    }
                });
            }
        });
    };

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Mutation
                mutation={LOGIN_MUTATION}
                update={(cache, {data: {UserLogin}}) => {
                    console.log(UserLogin);
                    let auth = {
                        isAuthenticated: UserLogin.token.code === 1,
                        user: {
                            id: "",
                            name: "",
                            username: "",
                            ...jwt.decode(UserLogin.token.content),
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
                {(loginMutation, {data, client}) => (
                    <div className="bg-grey">
                            <div className="form_content">
                                <Form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.handleSubmit(loginMutation, client);
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
                                            Log in
                                        </Button>
                                        {/* Or <a href="">register now!</a> */}
                                    </FormItem>
                                </Form>
                                <div>
                                    <FacebookLogin
                                        appId="285659762264023"
                                        callback={(data) => {
                                            this.responseFacebook(data, LOGIN_MUTATION);
                                        }}
                                        icon="fa-facebook"
                                        scope="public_profile,user_friends,email"
                                    />
                                </div>
                            </div>
                        </div>
                )}
            </Mutation>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default withApollo(WrappedLogin);
