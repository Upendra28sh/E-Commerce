import React from 'react';
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
                        <div className='main_box'>
                            <div className="box_header">
                                <div className={this.state.selected === 0 ? "selected" : ""} onClick={() => this.setState({selected: 0})}>Login</div>
                                <div className={this.state.selected === 1 ? "selected" : ""} onClick={() => this.setState({selected: 1})}>Signup</div>
                            </div>
                            <div className="box_content">
                            {
                                this.state.selected ? <Signup {...this.props} /> : <Login {...this.props}/>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;