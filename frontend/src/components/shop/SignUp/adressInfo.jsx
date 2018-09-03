import React from 'react';
import { Form, Input, Button,Icon } from 'antd';

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
                    <Icon onClick={this.props.onNext.bind(this) }  type="right" theme="outlined" style={{left:'90%',position :'absolute',top:'45%',fontSize:'35px',fontWeight:'25px'}} />

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
                        <Icon onClick={this.props.onPrev.bind(this) }  type="left" theme="outlined" style={{right:'90%',position :'absolute',top:'45%',fontSize:'35px',fontWeight:'25px'}} />


                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedAddressDetails = Form.create()(AddressDetails);

export default WrappedAddressDetails;