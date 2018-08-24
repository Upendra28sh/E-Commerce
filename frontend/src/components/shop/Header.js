import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Cascader, Input, Dropdown, Menu, Icon, Button, Row, Col} from 'antd';
import {Query} from 'react-apollo';
import {GET_AUTH} from '../query';

const Search = Input.Search;

const MenuI = (props) => {

    return (
        <Menu>
            <Menu.Item key="1">Your Profile</Menu.Item>
            <Menu.Item key="2">Your Order</Menu.Item>
            <Menu.Item key="3"><NavLink to="/saved">Saved Products</NavLink></Menu.Item>
            <Menu.Item key="4">Log Out</Menu.Item>
        </Menu>
    );
};


const menu = (
    <div className="categories">
        <Row>
            <Col span={6}>
                <ul className="categories__list">
                    <strong>
                        <li>Men</li>
                    </strong>
                    <li>Shoes</li>
                    <li>Pants</li>
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Pants</li>
                </ul>
            </Col>
            <Col span={6}>
                <ul className="categories__list">
                    <strong>
                        <li>Women</li>
                    </strong>
                    <li>Shoes</li>
                    <li>Pants</li>
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Pants</li>
                </ul>
            </Col>
            <Col span={6}>
                <ul className="categories__list">
                    <strong>
                        <li>Kids</li>
                    </strong>
                    <li>Shoes</li>
                    <li>Pants</li>
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Pants</li>
                </ul>
            </Col>
            <Col span={6}>
                <ul className="categories__list">
                    <strong>
                        <li>Electronics</li>
                    </strong>
                    <li>Shoes</li>
                    <li>Pants</li>
                    <li>Clothes</li>
                    <li>Shoes</li>
                    <li>Pants</li>
                </ul>
            </Col>
        </Row>
    </div>
);

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            search: false
        };
    }

    handleSearch = () => {
        this.setState(
            prevState => {
                return {
                    search: !prevState.search
                };
            }
        );
    };

    render() {

        if (this.props.history.location.pathname === "/") {
            return <div></div>;
        }
        else
            return (
                <Query query={GET_AUTH}>
                    {({data, client}) => (
                        <div className="navbar_container">
                            {console.log("Data: : ", data)}
                            <div className='container_40'>
                                <ul className="nav_bar">
                                    <li>
                                        <Dropdown overlay={menu} trigger={["click"]}>
                                            <span>Categories</span>
                                        </Dropdown>
                                    </li>
                                    <li>
                                        <Link to="/feed">My Feed</Link>
                                    </li>
                                    <li>
                                        <Link to="/trending">Trending</Link>
                                    </li>
                                    <div className="float-right">
                                        <li>
                                            <Icon type='bell' style={{fontSize: 18}}/>
                                        </li>

                                        {
                                            this.state.search ? (
                                                <li>
                                                    <Search
                                                        placeholder="Search Text"
                                                        onSearch={value => this.props.history.push(`/search/${value}`)}
                                                        style={{width: '200px', border: 'none', borderRadius: '5%'}}
                                                    />
                                                </li>
                                            ) : (
                                                <li onClick={this.handleSearch}>
                                                    <Icon type='search' style={{fontSize: 18}}/>
                                                </li>
                                            )
                                        }

                                        <li>
                                            <Link to="/cart"><Icon type='shopping-cart' style={{fontSize: 18}}/></Link>
                                            {/* <div>{this.props.shopping_cart.length}</div> */}
                                        </li>

                                        <li style={{
                                            border: 'solid 2px gray',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                            marginLeft: '10px'
                                        }}>
                                            Hi {Object.keys(data).length > 0 ? `, ${data.auth.user.name}` : ""}
                                        </li>

                                        <li style={{
                                            border: 'solid 2px gray',
                                            paddingTop: '0px',
                                            paddingBottom: '0px',
                                            marginLeft: '10px'
                                        }}>
                                            <Dropdown overlay={<MenuI/>} trigger={['click']}
                                                      placement='bottomRight'>
                                                <a className="ant-dropdown-link">
                                                    <Icon type="down"/>
                                                </a>
                                            </Dropdown>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    )}
                </Query>
            );
    }
};

export default Header;