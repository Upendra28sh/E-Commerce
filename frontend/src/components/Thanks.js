import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/home';
// import { Link } from 'react-router';

class Thanks extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <img className="thumbsUp" src="/like.svg"></img>
                <h2 className="thanks">Thank you for your purchase!</h2>
            </div>
        );
    }
}

const ThanksContainer = connect(
    state => state,
    actions
)(Thanks);

export default ThanksContainer;
