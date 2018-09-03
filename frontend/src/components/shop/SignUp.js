import React from "react";
import { Steps, Icon, Button } from "antd";
import BasicDetails from "./SignUp/basicinfo";
import AddressDetails from "./SignUp/adressInfo";
import PasswordDetails from "./SignUp/Confirm";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
const Step = Steps.Step;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      name:'',
      email:'',
      image:'',
      about:'',
      password:'',
      username:'',
      address:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
    };
  }

 
  getContent() {
    switch (this.state.current) {
      case 0:
        return <BasicDetails onNext={this.onNext.bind(this)} onPrev={this.onPrev.bind(this)} {...this.state}/>;
      case 1:
        return <AddressDetails  onNext={this.onNext.bind(this)} onPrev={this.onPrev.bind(this)}  {...this.state}/>;
      case 2:
        return <PasswordDetails  onNext={this.onNext.bind(this)} onPrev={this.onPrev.bind(this)} {...this.state} />;
    }
  }

  onNext() {
    let current = this.state.current;
    this.setState({
      current: current + 1
    });
  }

  onPrev() {
    let current = this.state.current;
    this.setState({
      current: current - 1
    });
  }
  render() {
    return (
      <div>
        <div className="container_40">
          <div id="progress">
            <div>
              {console.log(this.state)}
              <div className="container_40">
                <div id="progress">
                  <Steps progressDot current={this.state.current}>
                    <Step
                      title="Basic Info"
                      description="This is a description."
                    />
                    <Step
                      title="Address Info"
                      description="This is a description."
                    />
                    <Step
                      title="Password info"
                      description="This is a description."
                    />
                  </Steps>
                </div>
              </div>
              <div className="bg-grey">
                <div className="container_40">
                    {this.getContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default SignUp;
