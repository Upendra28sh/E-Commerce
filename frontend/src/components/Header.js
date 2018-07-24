import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Cascader, Input, Dropdown, Menu, Icon } from 'antd';

const Search = Input.Search;

const menu = (
    <Menu>
        <Menu.Item key="1">Your Profile</Menu.Item>
        <Menu.Item key="2">Your Order</Menu.Item>
        <Menu.Item key="3"><NavLink to="/saved">Saved Products</NavLink></Menu.Item>
    </Menu>
);

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
    return (
        <ul className="nav">
            <img src="/like.svg" className="header__logo"/>
            <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
            <li>
                <Cascader options={options} expandTrigger={'hover'} style={{height: '100%', width: '100%'}}>
                    <a>Categories</a>
                </Cascader>
            </li>
            <li>{props.token ?
                <Link onClick={props.logout} to="">Log Out</Link> :
                <Link onClick={props.toggleLogin} to="">Log In</Link> }
            </li>
            <li><NavLink to="/signup" activeClassName="active">Sign Up</NavLink></li>

            <div style={{width: '20%'}}></div>

            <li>
                <Search
                    placeholder="input search text"
                    onSearch={value => props.history.push(`/search/${value}`)}
                    style={{ width: '200px', marginTop: '10px' }}
                />
            </li>

            <li>
                <div className="cart">
                    <Link to="/cart">
                        <img src="/shopping-cart.svg"></img>
                        <div>{props.shopping_cart.length}</div>
                    </Link>
                </div> 
            </li>

            <li>
                <Dropdown overlay={menu} trigger={['click']} placement='bottomRight'>
                    <a className="ant-dropdown-link" href="#">
                        <Icon type="down" />
                    </a>
                </Dropdown>
            </li>

        </ul>
    );
}

export default Header;