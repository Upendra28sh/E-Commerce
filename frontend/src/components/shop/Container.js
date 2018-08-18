import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/shop';
import Router from '../../router/ShopRouter';
import Header from './Header'
class Container extends React.Component {

    render() {
        return (
            <div>
                <Header {...this.props}
                />
                <div className='main'>
                    <Router/>
                </div>
            </div>
        )
    }
}

export default Container;
