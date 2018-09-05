import React, {Fragment} from 'react';
import {Form, Input, Switch, Button, Icon, Row, Col , message} from 'antd';
import {withApollo} from 'react-apollo';

import {ADD_PRODUCT} from '../Query/query';
import UploadAvatar from "../Shared/UploadAvatar";

const FormItem = Form.Item;
const {TextArea} = Input;
let uuid = 0;

class AddProduct extends React.Component {
    state = {
        confirmDirty: false,
        total_cost: 150,
        cod_cost: 50,
        shipping_cost: 150,
        isCod: false,
        current_price: 0

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

    prepareInput({name, image, price, description, cod, returnAcc, keywords, sizes}) {
        return {
            "input": {
                "name": name,
                "image": image,
                "description": description,
                "price": this.state.shipping_cost + this.state.current_price + this.getCodValue() ,
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
                let variables = this.prepareInput({
                    ...values
                });
                this.props.client.mutate({
                    mutation: ADD_PRODUCT,
                    variables: variables
                }).then(({data}) => {
                    data = data.addProduct ;
                    if(data.product.id){
                        message.success("Product Submitted For Approval");
                        this.props.history.push('/products')
                    }
                });
                console.log(variables);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    handlePriceChange = (e) => {
        let value = e.target.value;
        if (value) {
            value = parseInt(value);
        } else {
            value = 0;
        }

        console.log(1);
        this.setState({
            current_price: value
        });
    };

    handleCodChange = (checked) => {
        this.setState({
            isCod: checked
        });
    };


    getCodValue = () => {
        if (this.state.isCod) {
            return this.state.cod_cost;
        }
        return 0;
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
                    key={k}
                >
                    {
                        getFieldDecorator(`sizes[${k}]`, {
                            validateTrigger: ["onChange", "onBlur"],
                            rules: [
                                {
                                    whitespace: true,
                                    message: "Please input size or delete this field."
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
                        keys.length > 0 ? (
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
                        {/*<UploadAvatar/>*/}
                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Title</div>
                                    <small>
                                        Include keywords that buyers would use to search for your item
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
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

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Image</div>
                                    <small>
                                        Add as many as you can so buyers can see every detail.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
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
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Price</div>
                                    <small>
                                        Factor in the costs of materials and labour, plus any related business
                                        expenses.Consider the total price buyers will pay too — including shipping.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
                                    <div className='custom_input'>
                                        <Row>
                                            <Col span={8}>
                                                <div className='label'>Enter Base Price :</div>
                                            </Col>
                                            <Col span={16}>
                                                {
                                                    getFieldDecorator('price',
                                                        {
                                                            rules: [
                                                                {required: true, message: 'Enter the price'}
                                                            ]
                                                        })(
                                                        <Input onChange={this.handlePriceChange.bind(this)}
                                                               addonBefore="₹ " type="number"/>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='custom_input'>
                                        <Row>
                                            <Col span={8}>
                                                <div className='label'>Estimated Shipping Price :</div>
                                            </Col>
                                            <Col span={16}>
                                                <Input addonBefore="₹ " type="number" disabled
                                                       value={this.state.shipping_cost}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='custom_input'>
                                        <Row>
                                            <Col span={8}>
                                                <div className='label'>Estimated COD Cost :</div>
                                            </Col>
                                            <Col span={16}>
                                                <Input addonBefore="₹ " type="number" disabled
                                                       value={this.getCodValue()}/>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='custom_input'>
                                        <Row>
                                            <Col span={8}>
                                                <div className='label'>Total Cost :</div>
                                            </Col>
                                            <Col span={16}>
                                                <Input addonBefore="₹ " type="number" disabled
                                                       value={this.state.shipping_cost + this.state.current_price + this.getCodValue()}/>
                                            </Col>
                                        </Row>
                                    </div>

                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>About this listing</div>
                                    <small>
                                        Start with a brief overview that describes your item's finest features.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
                                    {
                                        getFieldDecorator('description',
                                            {
                                                rules: [
                                                    {required: true, message: 'Enter a description'}
                                                ]
                                            })(
                                            <TextArea/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Keywords</div>
                                    <small>
                                        What words might someone use to search for your listings?
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
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
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Cash On Delivery</div>
                                    <small>
                                        Can user buy using Cash On Delivery.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
                                    {
                                        getFieldDecorator('cod', {valuePropName: 'checked'})
                                        (
                                            <Switch onChange={this.handleCodChange.bind(this)}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Return</div>
                                    <small>
                                        Can user return the product.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
                                    {
                                        getFieldDecorator('returnAcc', {valuePropName: 'checked'})
                                        (
                                            <Switch/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <div className='label-container'>
                                    <div>Sizes</div>
                                    <small>
                                        Enter the sizes your product is available in.
                                    </small>
                                </div>
                            </Col>
                            <Col offset={1} span={18}>
                                <FormItem>
                                    <Button type="dashed" onClick={this.add} style={{width: "80%"}}>
                                        <Icon type="plus"/> Add Size
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>

                        {formItems}

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedAddProduct = Form.create()(AddProduct);
export default withApollo(WrappedAddProduct);