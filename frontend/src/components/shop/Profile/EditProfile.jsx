import React from 'react';
import {Redirect} from 'react-router-dom';
import { Form, Input, Button,Icon, message } from 'antd';
import {withApollo} from 'react-apollo';

import {GET_USER, UPDATE_USER} from '../../query';
const FormItem = Form.Item;

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            about: '',
            image: '',
            username: '',
            email: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const username = this.props.match.params["id"];
        console.log(username);
        
        this.props.client.query({
            query: GET_USER,
            variables: {username: username}
        }).then(
            data => {
                data = data.data.User;
                this.props.form.setFieldsValue({
                    'name': data.name,
                    'image': data.image,
                    'about': data.about,
                    'username': data.username,
                    'email': data.email
                });  
                this.setState({
                    name: data.name,
                    about: data.about,
                    image: data.image,
                    username: data.username,
                    email: data.email
                });
            }
        );
    }

    onChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.client.mutate({
            mutation: UPDATE_USER,
            variables: {
                input: {
                    name: this.state.name,
                    image: this.state.image,
                    about: this.state.about
                }
            }
        }).then(
            data => {
                data = data.data.updateUser;
                if (!!data) {
                    window.location.reload();
                    this.props.history.push(`/user/${this.state.username}`);
                } else {
                    message.error("There was some problem. Try again later.")
                }
            }
        )
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="form_content" style={{position:'relative'}}>
                <div className="container_160">
                    <div
                        style={{
                            margin: '40px 20px',
                            fontFamily: 'Work Sans'
                        }}
                    >
                        <h1>Edit your Profile</h1>
                    </div>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        <FormItem
                            {...formItemLayout}
                            label="Username"
                        >
                            {
                                getFieldDecorator('username') 
                                (
                                    <Input disabled/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Email"
                        >
                            {
                                getFieldDecorator('email') 
                                (
                                    <Input disabled/>
                                )
                            }
                        </FormItem>
                        
                        <FormItem
                            {...formItemLayout}
                            label="Name"
                        >
                            {
                                getFieldDecorator('name',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Name'}
                                    ]
                                }) (
                                    <Input onChange={(e)=>this.onChange(e)} />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="About"
                        >
                            {
                                getFieldDecorator('about',
                                {
                                    rules: [
                                        { required: true, message: 'Tell something about yourself'}
                                    ]
                                }) (
                                    <Input onChange={(e)=>this.onChange(e)}/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Image Upload"
                        >
                            {
                                getFieldDecorator('image',
                                {
                                    rules: [
                                        { required: true, message: 'Please upload you image'}
                                    ]
                                }) (
                                    <Input onChange={(e)=>this.onChange(e)}/>
                                )
                            }
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Update</Button>
                            <Button style={{margin: '5px'}} htmlType="button" onClick={() => this.props.history.push(`/user/${this.state.username}`)} >Back</Button>
                        </FormItem>

                    </Form>                   
                </div>
            </div>
        );
    }
}

const WrappedEditProfile = Form.create()(EditProfile);
export default withApollo(WrappedEditProfile);