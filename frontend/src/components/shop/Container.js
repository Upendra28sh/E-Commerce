import React from 'react';
import Router from '../router/ShopRouter';
import Header from './Header'
import MobileHeader from './MobileHeader';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        }
    }

    componentWillMount() {
        if(window.innerWidth <= 900) {
            this.setState({isMobile: true})
        } else {
            this.setState({isMobile: false})
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                {this.state.isMobile ? <MobileHeader {...this.props}/> : <Header {...this.props}/>}
                <div className='main'>
                    <Router/>
                </div>
            </div>
        )
    }
}

export default Container;
