import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Cascader, Input, Dropdown, Menu, Icon, Button} from 'antd';

const Search = Input.Search;

const MenuI = (props) => {

    return (
        <Menu>
            <Menu.Item key="1">Your Profile</Menu.Item>
            <Menu.Item key="2">Your Order</Menu.Item>
            <Menu.Item key="3"><NavLink to="/saved">Saved Products</NavLink></Menu.Item>
            <Menu.Item key="4"><a onClick={props.logout}>Log Out</a></Menu.Item>
        </Menu>
    );
};

const options = [{
    value: 'Clothes',
    label: 'clothes',
    children:
        [
            {
                value: 'Men',
                label: 'Men',
                children:
                    [
                        {
                            value: 'Shirts',
                            label: 'Shirts'
                        },
                        {
                            value: 'Pants',
                            label: 'Pants'
                        }
                    ]
            },
            {
                value: 'Women',
                label: 'Women',
                children:
                    [
                        {
                            value: 'Shirts',
                            label: 'Shirts'
                        },
                        {
                            value: 'Pants',
                            label: 'Pants'
                        }
                    ]
            },
            {
                value: 'Kids',
                label: 'Kids',
                children:
                    [
                        {
                            value: 'Shirts',
                            label: 'Shirts'
                        },
                        {
                            value: 'Pants',
                            label: 'Pants'
                        }
                    ]
            }
        ],
}, {
    value: 'Electronics',
    label: 'electronics',
    children:
        [
            {
                value: 'Phone',
                label: 'Phone',
            },
            {
                value: 'Laptop',
                label: 'Laptop',
            },
            {
                value: 'PC',
                label: 'PC',
            }
        ]
}];


const Header = (props) => {
    if (props.history.location.pathname === "/") {
        return <div></div>;
    }
    else
        return (
            <div className="navbar_container">
                <div className='container_40'>
                    <ul className="nav_bar">
                        {/*<img src="/like.svg" className="header__logo" alt='logo'/>*/}

                        <li>
                            <Cascader options={options} expandTrigger={'hover'} style={{height: '100%', width: '100%'}}>
                                <a>Categories</a>
                            </Cascader>
                        </li>
                        <li>
                            <Link to="/feed">My Feed</Link>
                        </li>
                        <li>
                            <Link to="/">Trending</Link>
                        </li>
                        <div className="float-right">

                            {/*<Search*/}
                            {/*placeholder="input search text"*/}
                            {/*onSearch={value => props.history.push(`/search/${value}`)}*/}
                            {/*style={{width: '200px', marginTop: '10px'}}*/}
                            {/*/>*/}

                            <li>
                                <Icon type='bell' style={{fontSize: 18}}/>

                            </li>
                            <li>
                                <Icon type='search' style={{fontSize: 18}}/>
                            </li>
                            <li>
                                <Link to="/cart"><Icon type='shopping-cart' style={{fontSize: 18}}/></Link>
                                {/* <div>{props.shopping_cart.length}</div> */}
                            </li>
                            <li style={{border: 'solid 2px gray', paddingTop: '0px', paddingBottom: '0px'}} >
                                Hi, {props.first_name || "Dhruv"}
                            </li>
                            <li style={{border: 'solid 1px gray', paddingTop: '0px', paddingBottom: '0px', marginLeft: '10px'}} >
                                <Dropdown overlay={<MenuI logout={props.logout}/>} trigger={['click']}
                                          placement='bottomRight'>
                                    <a className="ant-dropdown-link">
                                         <Icon type="down"/>
                                    </a>
                                </Dropdown>
                            </li>

                            {/*{props.token ?*/}
                            {/*<li>*/}
                            {/*<Dropdown overlay={<MenuI logout={props.logout}/>} trigger={['click']} placement='bottomRight'>*/}
                            {/*<a className="ant-dropdown-link">*/}
                            {/*Hi, {props.first_name} <Icon type="down"/>*/}
                            {/*</a>*/}
                            {/*</Dropdown>*/}
                            {/*</li> :*/}
                            {/*<li>*/}
                            {/*<Button onClick={props.toggleLogin} type="primary">*/}
                            {/*Log In*/}
                            {/*</Button>*/}
                            {/*&nbsp;&nbsp;*/}
                            {/*<NavLink to="/signup" activeClassName="active">Sign Up</NavLink>*/}
                            {/*</li>*/}
                            {/*}*/}


                        </div>
                    </ul>
                </div>
            </div>
        );
};

export default Header;