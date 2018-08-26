import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;

class ShopPolicy extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            let data = e.target;
                this.props.onNext(
                    data[0].value,
                    data[1].value,
                );
            }
        });
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
                    <Form onSubmit={this.handleSubmit}>
                        
                        <FormItem
                            {...formItemLayout}
                            label="Store Policy"
                        >
                            {
                                getFieldDecorator('Store',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Store Policy'}
                                    ]
                                }) (
                                    <Input.TextArea placeholder="Store Policy" rows={6} />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Return Policy"
                        >
                            {
                                getFieldDecorator('Return',
                                {
                                    rules: [
                                        { required: true, message: 'Please input your Return Policy'}
                                    ]
                                }) (
                                    <Input.TextArea placeholder="Return Policy" rows={6} />
                                )
                            }
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Save</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrappedShopPolicy = Form.create()(ShopPolicy);

export default WrappedShopPolicy;