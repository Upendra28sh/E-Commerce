import React from 'react';
import Login from './Login';

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
                                <div onClick={() => this.setState({selected: 0})}>Login</div>
                                <div onClick={() => this.setState({selected: 1})}>Signup</div>
                            </div>
                            <div className="box_content">
                            {
                                this.state.selected ? <p>Signup</p> : <Login {...this.props}/>
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