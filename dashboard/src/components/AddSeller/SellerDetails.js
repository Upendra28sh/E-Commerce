import React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class SellerDetails extends React.Component {
    state = {
        confirmDirty: false,
    };

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({
            'name': this.props.name,
            'image': this.props.image,
            'intro': this.props.intro,
            'address': this.props.address,
            'street': this.props.street,
            'city': this.props.city,
            'state': this.props.state,
            'zipcode': this.props.zipcode,
        });      
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("FORM SUBMITTING");
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //       if (!err) {
    //         let data = e.target;
    //             this.props.onNext(
    //                 data[0].value,
    //                 data[1].value,
    //                 data[2].value,
    //                 data[3].value,
    //                 data[4].value,
    //                 data[5].value,
    //                 data[6].value,
    //                 data[7].value
    //             );
    //         }
    //     });
    // }

    handleNext = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(this.props.form);
                const data = this.props.form.getFieldsValue();
                this.props.onNext(
                    data["name"],
                    data["image"],
                    data["intro"],
                    data["address"],
                    data["street"],
                    data["city"],
                    data["state"],
                    data["zipcode"]
                );
            }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
            <div className="form_content">
                <div className="container_80">
                    <Form 
                        // onSubmit={this.handleSubmit}
                    >
                        
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
                            label="Image"
                        >
                            {
                                getFieldDecorator('image',
                                {
                                    rules: [
                                        { required: true, message: 'Upload an Image'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Intro"
                        >
                            {
                                getFieldDecorator('intro',
                                {
                                    rules: [
                                        { required: true, message: 'Tell something about yourself'},
                                        { max: 280, message: 'Character limit exceeded (280 chars)' }
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

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
                                        { required: true, message: 'Please input the Street'}
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
                                        { required: true, message: 'Please input the City'}
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
                                        { required: true, message: 'Please input the State'}
                                    ]
                                }) (
                                    <Input />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Zipcode"
                        >
                            {
                                getFieldDecorator('zipcode',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Zipcode'}
                                    ]
                                }) (
                                    <Input type="number"/>
                                )
                            }
                        </FormItem>

                        {/* <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem> */}
                    </Form>
                </div>
                <div id="footer">
                    <button onClick={this.props.onBack}>Back</button>
                    <button onClick={this.handleNext}>Save and Continue</button>
                </div>
            </div>
        );
    }
}

const WrappedSellerDetails = Form.create()(SellerDetails);

export default WrappedSellerDetails;