import React, {Fragment} from 'react';
import {Form, Input, Switch, Button, Icon, Row ,Col} from 'antd';
import {withApollo} from 'react-apollo';

import {ADD_PRODUCT} from '../Query/query';

const FormItem = Form.Item;
let uuid = 0;

class AddProduct extends React.Component {
    state = {
        confirmDirty: false,
    };

    prepareKeywordsFromString = (s) => {
        let result = [];
        let init = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === ",") {
                let key = s.slice(init, i).trim();
                if (key.length > 0)
                    result.push(key);
                init = i + 1;
            }
        }
        return result;
    };

    prepareInput(name, image, price, description, cod, returnAcc, keywords, sizes) {
        return {
            "input": {
                "name": name,
                "image": image,
                "description": description,
                "price": price,
                "sizes": sizes,
                "codAccepted": cod ? true : false,
                "returnAccepted": returnAcc ? true : false,
                "keywords": this.prepareKeywordsFromString(keywords)
            }
        };
    }

    remove = k => {
        const {form} = this.props;
        const keys = form.getFieldValue("keys");

        if (keys.length === 1) {
            return;
        }

        form.setFieldsValue({
            keys: keys.filter(key => key !== k)
        });
    };

    add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue("keys");
        const nextKeys = keys.concat(uuid);
        uuid++;

        form.setFieldsValue({
            keys: nextKeys
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let variables = this.prepareInput(
                    values.name,
                    values.image,
                    values.price,
                    values.description,
                    values.cod,
                    values.returnAcc,
                    values.keywords,
                    values.sizes
                );
                this.props.client.mutate({
                    mutation: ADD_PRODUCT,
                    variables: variables
                }).then(
                    data => console.log(data)
                );
                console.log(variables);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    render() {
        const {getFieldDecorator, getFieldValue, setFieldsValue} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 18, offset: 6}
            }
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

        getFieldDecorator("keys", {initialValue: []});

        const keys = getFieldValue("keys");
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...formItemLayoutWithOutLabel}
                    required={true}
                    key={k}
                >
                    {
                        getFieldDecorator(`sizes[${k}]`, {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: "Please inputa size or delete this field."
                                }
                            ]
                        })(
                            <Input
                                placeholder="Size"
                                style={{width: "80%", marginRight: 8}}
                            />
                        )
                    }
                    {
                        keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null
                    }
                </FormItem>
            );
        });

        return (
            <div className="container">
                <div className="form_content new_product_form">
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={6}>
                                <div className='label-container'>
                                    <div>Title</div>
                                    <small>
                                        Include keywords that buyers would use to search for your item.
                                    </small>
                                </div>
                            </Col>
                            <Col span={18}>
                                <FormItem>
                                    {
                                        getFieldDecorator('name',
                                            {
                                                rules: [
                                                    {required: true, message: 'Enter the name'}
                                                ]
                                            })(
                                            <Input/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem
                            {...formItemLayout}
                            label="Image"
                        >
                            {
                                getFieldDecorator('image',
                                    {
                                        rules: [
                                            {required: true, message: 'Add an image'}
                                        ]
                                    })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Price"
                        >
                            {
                                getFieldDecorator('price',
                                    {
                                        rules: [
                                            {required: true, message: 'Enter the price'}
                                        ]
                                    })(
                                    <Input type="number"/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Description"
                        >
                            {
                                getFieldDecorator('description',
                                    {
                                        rules: [
                                            {required: true, message: 'Enter a description'}
                                        ]
                                    })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Keywords"
                        >
                            {
                                getFieldDecorator('keywords',
                                    {
                                        rules: [
                                            {required: true, message: 'Enter some keywords'}
                                        ]
                                    })(
                                    <Input/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="COD Accepted"
                        >
                            {
                                getFieldDecorator('cod', {required: true, valuePropName: 'checked'})
                                (
                                    <Switch/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Return Accepted"
                        >
                            {
                                getFieldDecorator('returnAcc', {required: true, valuePropName: 'checked'})
                                (
                                    <Switch/>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Sizes"
                        >
                            <Button type="dashed" onClick={this.add} style={{width: "80%"}}>
                                <Icon type="plus"/> Add Size
                            </Button>
                        </FormItem>

                        {formItems}

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedAddProduct = Form.create()(AddProduct);
export default withApollo(WrappedAddProduct);