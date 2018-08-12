import React from 'react';
import {Layout, Menu, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';

import Router from '../../router/AdminRouter';
// import '../../styles/admin/_index.css';

const {Header, Content, Footer, Sider} = Layout;

const source = [
    {
      date: "09-08-2018",
      id: "1004234",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: false,
      shipped: false,
      delivered: false,
      total: "Rs. 3500",
      status: "PrePaid",
      age: "1d 15h"
    },
    {
      date: "19-08-2018",
      id: "1004234",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: true,
      shipped: false,
      delivered: false,
      total: "Rs. 3900",
      status: "PrePaid",
      age: "2d 15h"
    },
    {
      date: "29-08-2018",
      id: "1004235",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: true,
      shipped: false,
      delivered: false,
      total: "Rs. 3800",
      status: "PrePaid",
      age: "3d 15h"
    },
    {
      date: "09-09-2018",
      id: "1004236",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: false,
      shipped: false,
      delivered: false,
      total: "Rs. 3700",
      status: "PrePaid",
      age: "1d 12h"
    },
    {
      date: "09-09-2018",
      id: "1004237",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: true,
      shipped: true,
      delivered: true,
      total: "Rs. 3700",
      status: "PrePaid",
      age: "1d 12h"
    },
    {
      date: "09-09-2018",
      id: "1004238",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: true,
      shipped: true,
      delivered: false,
      total: "Rs. 3700",
      status: "PrePaid",
      age: "1d 12h"
    },
    {
      date: "09-09-2018",
      id: "1004239",
      name: "Dhruv Ramdev",
      city: "Delhi",
      confirmed: true,
      packed: true,
      shipped: true,
      delivered: false,
      total: "Rs. 3700",
      status: "PrePaid",
      age: "1d 12h"
    }
  ];

class Container extends React.Component {
    render() {
        return (
            <Layout className={'admin-panel'}>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Link to={'/admin/listings'}>
                                <Icon type="user"/>
                                <span className="nav-text">Listings</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/admin/orders'}>
                            <Icon type="shopping-cart"/>
                            <span className="nav-text">Orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span className="nav-text">nav 3</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="bar-chart"/>
                            <span className="nav-text">nav 4</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="cloud-o"/>
                            <span className="nav-text">nav 5</span>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Icon type="appstore-o"/>
                            <span className="nav-text">nav 6</span>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Icon type="team"/>
                            <span className="nav-text">nav 7</span>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Icon type="shop"/>
                            <span className="nav-text">nav 8</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: 200}}>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: 24}}>
                            <Router />
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Container;