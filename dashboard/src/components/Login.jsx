import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Form, Icon, Input, Button, message} from "antd";
import gql from "graphql-tag";
import {Mutation} from "react-apollo";
import jwt from "jsonwebtoken";
import {GET_AUTH} from "./Query/query";

const FormItem = Form.Item;

const LOGIN_MUTATION = gql`
    mutation Login($input: SellerAuthInput) {
        SellerLogin(input: $input) {
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
                    if (data.SellerLogin.token.code === 1) {
                        console.log(data.SellerLogin.token.content);
                        localStorage.setItem("token", data.SellerLogin.token.content);
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
            <div className="main">
                <div className="main_page"></div>
                <Mutation
                    mutation={LOGIN_MUTATION}
                    update={(cache, {data: {SellerLogin}}) => {
                        console.log(SellerLogin);
                        let auth = {
                            isAuthenticated: SellerLogin.token.code === 1,
                            user: {
                                id: "",
                                name: "",
                                username: "",
                                ...jwt.decode(SellerLogin.token.content),
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
                        <div className="main_content">
                            <Link to="/shop/create"><button className="register btn btn-default">Register</button></Link>
                            <Row className="login">
                                <Col xl={4} md={8} sm={12} offset={8} className="form_content">
                                    <img className="logo" src="https://static.canva.com/static/images/canva_logo_100x100.png" />
                                    <h1>Sign In</h1>
                                    <Form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            this.handleSubmit(loginMutation, client);
                                        }}
                                    >
                                        <FormItem>
                                            {getFieldDecorator("shopName", {
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
                                </Col>
                                <Col xl={4} md={8} sm={12} className="intro">
                                    Aliquip velit ea sit quis exercitation mollit aliquip incididunt cupidatat do.
                                </Col>
                            </Row>
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
