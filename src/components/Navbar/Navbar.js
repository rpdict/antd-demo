import { Menu, Breadcrumb, Icon, Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Navbar.css';
import UserTable from '../UserTable/UserTable';
import WrappedRegistrationForm from '../UserInput/UserInput';

const {
  Header, Footer, Sider, Content,
} = Layout;


const SubMenu = Menu.SubMenu;

class AsideCollapse extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      collapse: false,
      mode: 'inline',
    };
    // this.onSubmitForm = this.onSubmitForm.bind(this);
  }

    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({
        collapsed,
        mode: collapsed ? 'vertical' : 'inline',
      });
    }

    onSubmitForm = () => {
      this.setState({
        reload: true,
      });
    }

    render() {
      return (
        <Router>
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
                >
                  <Menu.Item key="1"><Link to="/about">Add User</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/inbox">User Table</Link></Menu.Item>
                  <Menu.Item key="3">Alex</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={<span><Icon type="team" /><span className="nav-text">Team</span></span>}
                >
                  <Menu.Item key="4">Team 1</Menu.Item>
                  <Menu.Item key="5">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="6">
                  <span>
                    <Icon type="file" />
                    <span className="nav-text">File</span>
                  </span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  <Route path="/about" component={WrappedRegistrationForm} onSubmitForm={this.onSubmitForm.bind(this)} />
                  {/* <WrappedRegistrationForm onSubmitForm={this.onSubmitForm.bind(this)} /> */}
                  <Route path="/inbox" component={UserTable} />
                  {/* <UserTable /> */}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </Router>
      );
    }
}

export default AsideCollapse;
