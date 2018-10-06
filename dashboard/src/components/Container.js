import React from 'react';
import {Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import Router from './Router/AppRouter';
import {withApollo} from 'react-apollo'
import {GET_AUTH} from "./Query/query";

const {Header, Content, Footer, Sider} = Layout;

class Container extends React.Component {
    state = {
        collapsed: false,
    };

    constructor(props){
        super(props);
        this.logout = this.logout.bind(this)
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    logout() {
        localStorage.clear();
        this.props.client.clearStore().then(data => {
            let auth = {
                isAuthenticated: false,
                user: {
                    id: "",
                    name: "",
                    username: "",
                    __typename: "AuthUser"
                },
                __typename: "Auth"
            };

            this.props.client.writeQuery({
                query: GET_AUTH,
                data: {auth}
            });

            console.log(data);
            console.log("Logout");
            this.props.history.push('/');
        });

    }


    render() {
        return (
            <Layout className={'admin-panel'} style={{minHeight : '100vh'}}>
                <Sider

                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    breakpoint="lg"
                    collapsedWidth="80"
                    width={256}>

                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to={'/'}>
                                <Icon type="user"/>
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/products'}>
                                <Icon type="user"/>
                                <span className="nav-text">Products</span>
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
                            <Link to={'/posts'}>
                                <Icon type="user"/>
                                <span className="nav-text">Posts</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={'/chats'}>
                                <Icon type="message"/>
                                <span className="nav-text">Chats</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="7">
                            <Link to={'/profile'}>
                                <Icon type="profile" />
                                <span className="nav-text">Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <div onClick={this.logout}>
                                <Icon type="profile" />
                                <span className="nav-text">Logout</span>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: 24}}>
                            <Router/>
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

export default withApollo(Container);