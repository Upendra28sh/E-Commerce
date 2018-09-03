import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class BasicDetails extends React.Component {
    
    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'name': this.props.name,
            'image': this.props.image,
            'about': this.props.about,
            'username': this.props.username,
            'image': this.props.image,
        });     
       
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
            
                <div className="container_80">
                
                    <Form>
                    <Button onClick={this.props.onNext.bind(this) } type="primary" shape="circle" icon="double-right" style={{left:'90%',position :'absolute',top:'45%'}} size='large' />

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
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Email"
                        >
                            {
                                getFieldDecorator('email',
                                {
                                    rules: [
                                        { required: true, message: 'Please provide with email'}
                                    ]
                                }) (
                                    <Input />
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
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Username"
                        >
                            {
                                getFieldDecorator('username',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Username'}
                                    ]
                                }) (
                                    <Input />
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
                                    <Input />
                                )
                            }
                        </FormItem>
                        
                        <Button onClick={this.props.onPrev.bind(this) } type="primary" shape="circle" icon="double-left" style={{right:'90%',position :'absolute',top:'45%'}} size='large' />

                    </Form>
                   
                </div>
                
                
            </div>
        );
    }
}

const WrappedBasicDetails = Form.create()(BasicDetails);

export default WrappedBasicDetails;