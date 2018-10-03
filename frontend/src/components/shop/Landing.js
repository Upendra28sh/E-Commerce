import React from 'react';
import { Row, Col } from 'antd';
import Login from './Login';
import Signup from './Signup';

class Landing extends React.Component {
    state = {
        selected: 0
    }

    render() {
        return (
            <div>
                <div className="main">
                    <div className="main_page"></div>
                    <div className="main_content">
                        <Row>
                            <Col xs={16} sm={16} xl={8} offset={4}>
                                <div className='main_box'>
                                    <Row className="box_header">
                                        <Col 
                                            span={12}
                                            className={this.state.selected === 0 ? "selected" : ""} 
                                            onClick={() => this.setState({selected: 0})}
                                        >
                                            Login
                                        </Col>
                                        <Col 
                                            span={12}
                                            className={this.state.selected === 1 ? "selected" : ""} 
                                            onClick={() => this.setState({selected: 1})}
                                        >
                                            Signup
                                        </Col>
                                    </Row>
                                    <div className="box_content">
                                    {
                                        this.state.selected ? <Signup {...this.props} /> : <Login {...this.props}/>
                                    }
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={0} xl={6} style={{padding: '20px', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>
                                <p>Ullamco id aute cupidatat dolore consectetur irure nostrud minim est enim. Labore cillum Lorem excepteur est ad aliquip duis deserunt ea ea enim consectetur proident.</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;