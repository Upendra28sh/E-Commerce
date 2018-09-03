import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class AddressDetails extends React.Component {
   
    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'address': this.props.address,
            'state': this.props.state,
            'city': this.props.city,
            'zipcode': this.props.zipcode,
            'street': this.props.street,
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
                    <Button onClick={this.props.onNext.bind(this) } type="primary" shape="circle" icon="double-right" style={{left:'90%',position :'absolute',top:'45%'}} size='large' />

                        <FormItem
                            {...formItemLayout}
                            label="Address"
                        >
                            {
                                getFieldDecorator('address',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Address'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Street"
                        >
                            {
                                getFieldDecorator('street',
                                {
                                    rules: [
                                        { required: true, message: 'Please fill the Street'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="City"
                        >
                            {
                                getFieldDecorator('city',
                                {
                                    rules: [
                                        { required: true, message: 'Please tell about city'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="State"
                        >
                            {
                                getFieldDecorator('state',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your State'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Zip Code"
                        >
                            {
                                getFieldDecorator('zipcode',
                                {
                                    rules: [
                                        { required: true, message: 'Please tell the Zip Code'}
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

const WrappedAddressDetails = Form.create()(AddressDetails);

export default WrappedAddressDetails;