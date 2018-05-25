import { Menu, Breadcrumb, Icon, Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import './Navbar.css';
import UserTable from '../UserTable/UserTable';
import WrappedRegistrationForm from '../UserInput/UserInput';

const history = createHistory();
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
      current: history.location.pathname,
    };
    // this.onSubmitForm = this.onSubmitForm.bind(this);
  }

    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    onCollapse = (collapsed) => {
      // console.log(collapsed);
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

    handleClick = (e) => {
      console.log('click ', e);
      console.log(this.state.current);
      this.setState({
        current: e.key,
      });
      // history.push(e.key);
      // history.location.pathname = this.state.current;
      // history.go(-1);
    }

    render() {
      const { location } = this.props;
      return (
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode={this.state.mode}
              onClick={this.handleClick}
              defaultOpenKeys={['sub1']}
              selectedKeys={[location.pathname]}
            >
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
              >
                <Menu.Item key="/api/about"><NavLink to="/api/about">Add User</NavLink></Menu.Item>
                <Menu.Item key="/api/inbox"><NavLink to="/api/inbox">User Table</NavLink></Menu.Item>
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
                <Route
                  path="/api/about"
                  render={() => (
                    <WrappedRegistrationForm onSubmitForm={this.onSubmitForm.bind(this)} />
                  )}
                />
                <Route path="/api/about" component={UserTable} />
                {/* <WrappedRegistrationForm onSubmitForm={this.onSubmitForm.bind(this)} /> */}
                <Route path="/api/inbox" component={UserTable} />
                {/* <UserTable /> */}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      );
    }
}

export default withRouter(AsideCollapse);
