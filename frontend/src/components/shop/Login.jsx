import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const FormItem = Form.Item;

const LOGIN_MUTATION = gql`
    mutation Login($input: AuthInput) {
        UserLogin(input: $input) {
            token {
                code ,
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

    handleSubmit = (loginMutation) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                loginMutation({variables: {input: values}}).then(({data}) => {
                    if (data.UserLogin.token.code === 1) {
                        console.log(data.UserLogin.token.content);
                        localStorage.setItem('token', data.UserLogin.token.content);
                        // setAuthHeader(data.UserLogin.token.content);
                        // dispatch(setCurrentUser(jwtDecode(token.token)))
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Mutation mutation={LOGIN_MUTATION}>
                {(loginMutation) => (
                    <div className="bg-grey">
                        <div className="container_320">
                            <div className="form_title">
                                <h1>Sign In</h1>
                            </div>
                            <div className="form_content">
                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleSubmit(loginMutation);
                                }}>
                                    <FormItem>
                                        {getFieldDecorator('email', {
                                            rules: [{required: true, message: 'Please input your Email!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Email"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please input your Password!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   type="password" placeholder="Password"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button htmlType="submit" className="submit_btn">
                                            Log in
                                        </Button>
                                        Or <a href="">register now!</a>
                                    </FormItem>
                                </Form>
                                <p style={{paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;