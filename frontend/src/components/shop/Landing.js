import React from 'react';
import {Row, Col} from 'antd';
import Login from './Login';
import Signup from './Signup';
import Typing from 'react-typing-animation'

class Landing extends React.Component {
    state = {
        selected: 1
    };

    render() {
        return (
            <div>
                <div className="main">
                    <div className="main_page"/>
                    <div className="seller_link">
                        <a href='//seller.frnzy.in'>
                            <button className='btn btn-block'>
                            Sell On Frnzy
                            </button>
                        </a>
                    </div>
                    <div className="main_content">
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <div className='main_box'>
                                    <div className='main_logo'>
                                        <img src="/images/Frnzy Square.png" alt=""/>
                                    </div>
                                    <div className="box_content">
                                        {
                                            this.state.selected ?
                                                <div className='box_text'>
                                                    <Signup {...this.props} />
                                                    <p>
                                                        Existing User ? <span onClick={() => {
                                                        this.setState({selected: 0});
                                                    }}>Login</span>
                                                    </p>
                                                </div>
                                                :
                                                <div className='box_text'>
                                                    <Login {...this.props}/>
                                                    <p> New User ? <span onClick={() => {
                                                        this.setState({selected: 1});
                                                    }}>Signup</span>
                                                    </p>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={0} md={12}>
                                <div className="box_animated_text">
                                    <h3>
                                        A discovery based social-shopping platform.
                                    </h3>
                                    <Typing loop={true}>
                                        <span>DISCOVERY.</span>
                                        <Typing.Backspace count={10} delay={1000}/>
                                        <span>COMMUNITY.</span>
                                        <Typing.Backspace count={10} delay={1000}/>
                                        <span>SHOPPING.</span>
                                        <Typing.Backspace count={10} delay={1000}/>
                                    </Typing>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;