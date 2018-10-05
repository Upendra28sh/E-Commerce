import React from 'react';
import {Row, Col} from 'antd';
import Login from './Login';
import Signup from './Signup';

class Landing extends React.Component {
    state = {
        selected: 0
    };

    render() {
        return (
            <div>
                <div className="main">
                    <div className="main_page"/>
                    <div className="main_logo_1">
                        <img src="/FRNZY.jpg" alt=""/>
                    </div>
                    <div className="main_content">
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <div className='main_box'>
                                    <div className='main_logo'>
                                        <img src="/frnzy_logo.png" alt=""/>
                                    </div>
                                    {/*<Row className="box_header">*/}
                                        {/*<Col*/}
                                            {/*span={12}*/}
                                            {/*className={this.state.selected === 0 ? "selected" : ""}*/}
                                            {/*onClick={() => this.setState({selected: 0})}*/}
                                        {/*>*/}
                                            {/*Login*/}
                                        {/*</Col>*/}
                                        {/*<Col*/}
                                            {/*span={12}*/}
                                            {/*className={this.state.selected === 1 ? "selected" : ""}*/}
                                            {/*onClick={() => this.setState({selected: 1})}*/}
                                        {/*>*/}
                                            {/*Signup*/}
                                        {/*</Col>*/}
                                    {/*</Row>*/}
                                    <div className="box_content">
                                        {
                                            this.state.selected ? <Signup {...this.props} /> : <Login {...this.props}/>
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col xs={0} sm={0} md={12}
                                 style={{padding: '20px', fontSize: '20px', color: 'white', fontWeight: 'bold'}}>
                                <p>Ullamco id aute cupidatat dolore consectetur irure nostrud minim est enim. Labore
                                    cillum Lorem excepteur est ad aliquip duis deserunt ea ea enim consectetur
                                    proident.</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;