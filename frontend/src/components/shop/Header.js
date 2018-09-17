import React, {Fragment} from "react";
import {Link, NavLink} from "react-router-dom";
import {Col, Dropdown, Icon, Input, Menu, Popover, Row} from "antd";
import {Query, withApollo} from "react-apollo";
import {GET_AUTH} from "../query";
import Notifs from './Notification';

// TODO: Add User Notifications

const Search = Input.Search;
const text = <span style={{fontSize: '18px', fontWeight: '600'}}> Notifications</span>;

const MenuI = (props) => {
    console.log(props);
    return (
        <Menu>
            <Menu.Item key="1"><NavLink to={`/user/${props.user.username}`}>Your Profile</NavLink></Menu.Item>
            <Menu.Item key="2"><NavLink to="/orders">Your Orders</NavLink></Menu.Item>
            <Menu.Item key="3"><NavLink to="/chat">Your Messages</NavLink></Menu.Item>
            <Menu.Item key="4" onClick={props.logout}>Log Out</Menu.Item>
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

const left_section = (
    <Fragment>
        <li>
            <Dropdown overlay={menu} trigger={["click"]}>
          <span className="box-shadow-menu">
              {/*Menu*/}
          </span>
            </Dropdown>
        </li>
        <li>
            <Link to="/feed">My Feed</Link>
        </li>
        <li>
            {/*<Link to="/trending">Trending</Link>*/}
            <Link to="/trendingFeed">Trending</Link>
        </li>
    </Fragment>
);

class Header extends React.Component {
    handleSearch = () => {
        this.setState(prevState => {
            return {
                search: !prevState.search
            };
        });
    };
    handleCancel = () => {
        this.setState(prevState => {
            return {
                search: !prevState.search
            };
        });
    };

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            search: false
        };
    }

    logout() {
        localStorage.clear();
        this.props.client.clearStore().then(data => {
            console.log(data);
            console.log("Logout");
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
                            {/* {console.log("Data: : ", data)} */}

                            <div className='container_40'>
                                <ul className="nav_bar">
                                    {left_section}

                                    {data.auth.isAuthenticated && (
                                        <div className="float-right">


                                            {
                                                this.state.search ? (
                                                    <li
                                                        style={{
                                                            border: 'solid 2px gray',
                                                            paddingTop: '0px',
                                                            paddingBottom: '0px',
                                                        }}
                                                    >
                                                        <input
                                                            placeholder="Search text"
                                                            type="text"
                                                            onKeyPress={
                                                                e => {
                                                                    if (e.key == 'Enter') {
                                                                        this.props.history.push(`/search/${e.target.value}`);
                                                                    }
                                                                }
                                                            }
                                                            // onSearch={value => this.props.history.push(`/search/${value}`)}
                                                            // style={{width: '200px', border: 'none', borderRadius: '5%', borderColor: 'none', background: 'none'}}
                                                        />
                                                        <button
                                                            onClick={this.handleCancel}
                                                            className="search_cancel"
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ) : (
                                                    <li onClick={this.handleSearch}>
                                                        <Icon type='search' style={{fontSize: 18}}/>
                                                    </li>
                                                )
                                            }
                                            <li>
                                                <Popover placement="bottomRight" title={text}
                                                         content={<Notifs user={data}/>} trigger="click">
                                                    <Icon type='bell' style={{fontSize: 18}}/>
                                                </Popover>
                                            </li>

                                            <li>
                                                <Link to="/cart">
                                                    <Icon
                                                        type='shopping-cart'
                                                        style={{fontSize: 18}}
                                                    />
                                                </Link>
                                                {/* <div>{this.props.shopping_cart.length}</div> */}
                                            </li>

                                            <li style={{
                                                border: 'solid 2px gray',
                                                paddingTop: '0px',
                                                paddingBottom: '0px',
                                                marginLeft: '10px'
                                            }}>
                                                <Link
                                                    to={`/user/${data.auth.user.username}`}>Hi {Object.keys(data).length > 0 ? `, ${data.auth.user.name}` : ""}</Link>
                                            </li>

                                            <li style={{
                                                border: 'solid 2px gray',
                                                paddingTop: '0px',
                                                paddingBottom: '0px',
                                                marginLeft: '10px'
                                            }}>
                                                <Dropdown
                                                    overlay={<MenuI logout={this.logout} user={data.auth.user}/>}
                                                    trigger={['click']}
                                                    placement='bottomRight'>
                                                    <a className="ant-dropdown-link">
                                                        <Icon type="down"/>
                                                    </a>
                                                </Dropdown>
                                            </li>
                                        </div>)}

                                    {!data.auth.isAuthenticated && (
                                        <div className="float-right">
                                            <li>
                                                <Link to="/login">Login</Link>
                                                {/* <div>{this.props.shopping_cart.length}</div> */}
                                            </li>
                                            <li>
                                                <Link to="/signup">Register</Link>
                                                {/* <div>{this.props.shopping_cart.length}</div> */}
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </Query>
            );
    }
};

export default withApollo(Header);
