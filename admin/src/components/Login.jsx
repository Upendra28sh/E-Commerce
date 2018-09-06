import React from 'react';
import {Form, Icon, Input, Button, message} from "antd";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import jwt from "jsonwebtoken";
import {GET_AUTH} from "./Query/query";

const FormItem = Form.Item;

const LOGIN_MUTATION = gql`
    mutation Login($input: AdminAuthInput) {
        AdminLogin(input: $input) {
            token {
                code
                content
            }
        }
    }
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (loginMutation, client) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                loginMutation({variables: {input: values}}).then(({data}) => {
                    if (data.AdminLogin.token.code === 1) {
                        console.log(data.AdminLogin.token.content);
                        localStorage.setItem("token", data.AdminLogin.token.content);
                        message.success("Login Successful");
                        this.props.history.push("/");
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    update={(cache, {data: {AdminLogin}}) => {
                        let auth = {
                            isAuthenticated: AdminLogin.token.code === 1,
                            user: {
                                id: "",
                                name: "",
                                username: "",
                                ...jwt.decode(AdminLogin.token.content),
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
                        <div>
                            <div className="login_form">
                                <div className="form_title">
                                    <h1>Sign In</h1>
                                </div>
                                <div className="form_content">
                                    <Form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            this.handleSubmit(loginMutation, client);
                                        }}
                                    >
                                        <FormItem>
                                            {getFieldDecorator("username", {
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
                                            Or <a href="/shop/create">register now!</a>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                            <p style={{textAlign: "center"}}>
                                For help, contact us.
                            </p>
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
