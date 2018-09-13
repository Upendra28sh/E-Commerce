import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    Input,
    Dropdown,
    Menu,
    Icon,
    Row,
    Col,
    Popover
} from "antd";
import { Query } from "react-apollo";
import { GET_AUTH } from "../query";

// TODO: Add User Notifications

const Search = Input.Search;
const text = <span>Notifications</span>;

const MenuI = (props) => {
    return (
        <Menu>
            <Menu.Item key="1"><NavLink to={`/user/${props.user.username}`}>Your Profile</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/order">Your Order</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/wishlist">Your Wishlist</NavLink></Menu.Item>
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
                        <li>Menu</li>
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

class MobileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            search: false,
            expand: false
        };
    }

    handleSearch = () => {
        this.setState(prevState => {
            return {
                search: !prevState.search
            };
        });
    };

    handleClick = () => {
        this.setState(prevState => {
            return {
                expand: !prevState.expand
            };
        });
    }

    handleCancel = () => {
        this.setState(prevState => {
            return {
                search: !prevState.search
            };
        });
    }

    render() {

        if (this.props.history.location.pathname === "/") {
            return <div></div>;
        }
        else
            return (
                <Query query={GET_AUTH}>
                    {({data}) => (
                        <div className="navbar_container">
                            <nav class="navbar navbar-dark" style={{backgroundColor: 'rgb(40,40,40)'}}>
                                <div className="mobile_header">
                                    <div className="brand"><Link to="/">APPLE</Link></div>
                                    
                                    {
                                        data.auth.isAuthenticated && (
                                            <div className="icons">
                                                <div>
                                                {
                                                    this.state.search ? (
                                                        <div>
                                                            <input
                                                                placeholder="Search Text"
                                                                type="text"
                                                                onKeyPress = {
                                                                    e => {
                                                                        if (e.key == 'Enter') {
                                                                            this.props.history.push(`/search/${e.target.value}`)
                                                                        }
                                                                    }
                                                                }
                                                            />
                                                            <button 
                                                                onClick={this.handleCancel}
                                                                className="search_cancel"
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div onClick={this.handleSearch}>
                                                            <Icon type='search' style={{fontSize: 18}}/>
                                                        </div>
                                                    )
                                                }
                                                </div>
                                                
                                                <div>
                                                    <Link to="/cart">
                                                        <Icon type='shopping-cart' style={{fontSize: 18}}/>
                                                    </Link>
                                                </div>

                                                <div>
                                                    <Popover placement="bottomRight" title={text} content={"No Notifications Yet."} trigger="click">
                                                        <Icon type='bell' style={{fontSize: 18}}/>
                                                    </Popover>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                    <button class="navbar-toggler" type="button" onClick={this.handleClick}>
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                </div>
                                <div class={`collapse navbar-collapse ${this.state.expand ? 'show' : ''}`} id="navbarNav">
                                    <ul class="navbar-nav">
                                        {
                                            data.auth.isAuthenticated && (
                                                <Fragment>
                                                    <li className="nav-item active">
                                                        <Link to={`/user/${data.auth.user.username}`}>Hi {Object.keys(data).length > 0 ? `, ${data.auth.user.name}` : ""}</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link to="/feed">My Feed</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link to="/trendingFeed">Trending</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link to="/order">Order</Link>
                                                    </li>
                                                    <li class="nav-item active">
                                                        <Link to="/wishlist">Wishlist</Link>
                                                    </li>
                                                </Fragment>
                                            )
                                        }
                                        <li className="nav-item active">
                                            <Dropdown overlay={menu} trigger={["click"]}>
                                                <span>Categories</span>
                                            </Dropdown>
                                        </li>
                                        {
                                            !data.auth.isAuthenticated && (
                                                <Fragment>
                                                    <li className="nav-item active">
                                                        <Link to="/login">Login</Link>
                                                    </li>
                                                    <li className="nav-item active">
                                                        <Link to="/signup">Register</Link>
                                                    </li>
                                                </Fragment>
                                            )
                                        }

                                    </ul>
                                </div>
                            </nav>
                        </div>
                    )}
                </Query>
            )
    }
};

export default MobileHeader;
