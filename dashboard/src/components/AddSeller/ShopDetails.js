import React from "react";
import { Form, Input, Button, Upload,Icon } from "antd";

const FormItem = Form.Item;
const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
class ShopDetails extends React.Component {
  state = {
    confirmDirty: false
  };

  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      aadhar: this.props.aadhar,
      pan: this.props.pan,
      gst: this.props.gst,
      bank_name: this.props.bankName,
      account_number: this.props.accountNo,
      bank_IFSC: this.props.bankIFSC
    });
  }

  // handleSubmit = (e) => {
  //     e.preventDefault();
  //     this.props.form.validateFieldsAndScroll((err, values) => {
  //       if (!err) {
  //         let data = e.target;
  //             this.props.onNext(
  //                 data[0].value,
  //                 data[1].value,
  //                 data[2].value,
  //                 data[3].value,
  //                 data[4].value,
  //                 data[5].value
  //             );
  //         }
  //     });
  // }

  handleNext = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = this.props.form.getFieldsValue();
        this.props.onNext(
          data["aadhar"],
          data["aadhar_image"],
          data["pan"],
          data["pan_image"],
          data["gst"],
          data["bank_name"],
          data["account_number"],
          data["bank_IFSC"],
          data["cancelled_cheque"]
        );
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div className="form_content">
        <div className="container_80">
          <Form
          >
            <FormItem {...formItemLayout} label="Aadhar Number">
              {getFieldDecorator("aadhar", {
                rules: [
                  { required: true, message: "Please input your Aadhar Number" }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Upload Aadhar"
            >
              {getFieldDecorator("aadhar_image", {
                getValueFromEvent: this.normFile
              })(
                <Upload customRequest={dummyRequest}>
                  <Button>
                    <Icon type="upload" /> Click to upload Aadhar
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="PAN Number">
              {getFieldDecorator("pan", {
                rules: [
                  { required: true, message: "Please input your PAN Number" }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Upload PAN"
            >
              {getFieldDecorator("pan_image", {
                getValueFromEvent: this.normFile
              })(
                <Upload customRequest={dummyRequest}>
                  <Button>
                    <Icon type="upload" /> Click to upload PAN
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="GST Number">
              {getFieldDecorator("gst", {
                rules: [
                  { required: true, message: "Please input your GST Number" }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Bank Name">
              {getFieldDecorator("bank_name", {
                rules: [
                  { required: true, message: "Please input your Bank Name" }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Accont Number">
              {getFieldDecorator("account_number", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Bank Account Number"
                  }
                ]
              })(<Input type="number" />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Bank IFSC Code">
              {getFieldDecorator("bank_IFSC", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Bank IFSC Code"
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Upload Cancelled check"
            >
              {getFieldDecorator("cancelled_cheque", {
                getValueFromEvent: this.normFile
              })(
                <Upload customRequest={dummyRequest}>
                  <Button>
                    <Icon type="upload" /> Click to upload Cheque
                  </Button>
                </Upload>
              )}
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

const WrappedShopDetails = Form.create()(ShopDetails);

export default WrappedShopDetails;
