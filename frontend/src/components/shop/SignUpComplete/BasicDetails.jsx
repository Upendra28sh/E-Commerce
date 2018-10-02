import React from 'react';
import { Form, Input, Button,Icon } from 'antd';

const FormItem = Form.Item;

class BasicDetails extends React.Component {
    
    componentDidMount() {
        this.props.form.setFieldsValue({
            'name': this.props.name,
            'image': this.props.image,
            'about': this.props.about,
            // 'username': this.props.username,
        });     
    }
   handlenext(e)
   {
       e.preventDefault();
       this.props.form.validateFieldsAndScroll((err, values) => {if(!err){this.props.onNext()}})
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
                    <Icon onClick={(e)=>{this.handlenext(e)} }  type="right" theme="outlined" style={{left:'90%',position :'absolute',top:'45%',fontSize:'35px',fontWeight:'25px'}} />

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
                                    <Input onChange={(e)=>this.props.onChange(e)}onChange={(e)=>this.props.onChange(e)} />
                                )
                            }
                        </FormItem>

                        {/* <FormItem
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
                                    <Input onChange={(e)=>this.props.onChange(e)}/>
                                )
                            }
                        </FormItem> */}

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
                                    <Input onChange={(e)=>this.props.onChange(e)}/>
                                )
                            }
                        </FormItem>

                        {/* <FormItem
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
                                    <Input onChange={(e)=>this.props.onChange(e)}/>
                                )
                            }
                        </FormItem> */}

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
                                    <Input onChange={(e)=>this.props.onChange(e)}/>
                                )
                            }
                        </FormItem>
                        

                    </Form>
                   
                </div>
                
                
            </div>
        );
    }
}

const WrappedBasicDetails = Form.create()(BasicDetails);

export default WrappedBasicDetails;