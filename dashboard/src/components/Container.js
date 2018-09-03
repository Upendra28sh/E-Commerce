import React from 'react';
import {Layout, Menu, Icon, Divider} from 'antd';
import {Link} from 'react-router-dom';
import Router from './Router/AppRouter';

const {Header, Content, Footer, Sider} = Layout;

class Container extends React.Component {
    render() {
        return (
            <Layout className={'admin-panel'}>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to={'/'}>
                                <Icon type="user"/>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/sellers'}>
                                <Icon type="user"/>
                                <span className="nav-text">Sellers</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={'/orders'}>
                                <Icon type="shopping-cart"/>
                                <span className="nav-text">Orders</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={'/users'}>
                                <Icon type="user"/>
                                <span className="nav-text">Users</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to={'/products'}>
                                <Icon type="user"/>
                                <span className="nav-text">Products</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <Divider/>
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