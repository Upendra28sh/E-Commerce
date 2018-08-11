import React from 'react';
import { Button, Card, Menu, Row, Col } from 'antd';
import {Switch, Route, Link, Redirect} from 'react-router-dom';

import Posts from '../Shared/Posts';
import Products from '../Shared/Products';

const {Meta} = Card;

const navGroup = () => {
    return (
        <div className="navigate__items">
            <Row>
                <Link to="/trending/products"><Col span={12}>Products</Col></Link>
                <Link to="/trending/posts"><Col span={12}>Posts</Col></Link>
            </Row>
        </div>
    )
}

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: false
        }
    }

    fixedHeader = () => {
        let fixed = undefined;
        if (window.pageYOffset > 90) {
            fixed = true;
        } else {
            fixed = false;
        }
        if (this.state.fixedHeader !== fixed) {
            this.setState(
                (prevState) => ({
                    fixedHeader: fixed
                })
            )
        }
        
    }

    render() {
        return (
            <div className='bg-grey'>
                {
                    window.onscroll = () => this.fixedHeader()
                }
                {
                    this.state.fixedHeader ? (
                        <div className="navigate navigate--sticky">
                            {navGroup()}                                        
                        </div>
                    ) : (
                        <div className="navigate">
                            {navGroup()}                                                                              
                        </div>
                    )
                }
                <Redirect to="/trending/posts" />
                <Switch>
                    <Route path="/trending/posts" component={Posts} />
                    <Route path="/trending/products" component={Products} />
                </Switch>
            </div>
        );
    }
}

export default Container;