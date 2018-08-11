import React from 'react';
import {Progress, Input} from 'antd';

import ShopName from "./ShopName";
import ShopDetails from './ShopDetails';
import SellerDetails from './SellerDetails';

const pages = [
    <ShopName />,
    <SellerDetails />,
    <ShopDetails />,
];

class AddSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 100/3,
            page: 0,
            gst: false
        }
    }

    onContinue = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent < 100)
                    return {
                        percent: prevState.percent += 100/3,
                        page: prevState.page += 1
                    }
            }
        );
    };

    onBack = () => {
        this.setState(
            (prevState) => {
                if (prevState.percent > 100/3)
                    return {
                        percent: prevState.percent -= 100/3,
                        page: prevState.page -= 1
                    }
            }
        );
    };

    render() {
        return (
            <div>
                <div className="container_40">
                    <div id="progress">
                        <Progress showInfo={false} percent={this.state.percent}/>
                    </div>
                </div>
                <div className="bg-grey">
                    <div className="container_40">
                        {pages[this.state.page]}
                        <p style={{paddingTop: '20px', paddingBottom: '10px', textAlign: 'center'}}>For help, contact us.</p>
                        <div id="footer">
                            <button onClick={this.onBack}>Back</button>
                            <button onClick={this.onContinue}>Save and Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddSeller;


/*
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

const steps = [{
  title: 'Name',
  content: <ShopName />
}, {
  title: 'Seller Details',
  content: <SellerDetails />,
}, {
  title: 'Billing Info',
  content: <ShopDetails />,
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
      <Step status="finish" title="Login" icon={<Icon type="user" />} />
    <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
    <Step status="process" title="Pay" icon={<Icon type="loading" />} />
    <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {
            current < steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);

*/