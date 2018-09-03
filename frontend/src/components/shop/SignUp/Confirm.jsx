import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;


class PasswordDetails extends React.Component {
    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'password': this.props.password,
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
                    <Form >

                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                        >
                            {
                                getFieldDecorator('Confirm Password',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Password'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>
  
                        <FormItem
                            {...formItemLayout}
                            label="Confirm Password"
                        >
                            {
                                getFieldDecorator('Name',
                                {
                                    rules: [
                                        { required: true, message: 'Please Confirm master'}
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

const WrappedPasswordDetails = Form.create()(PasswordDetails);

export default WrappedPasswordDetails;