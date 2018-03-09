import { Menu, Breadcrumb, Icon } from 'antd';
import React from 'react';
import './Navbar.css';
import UserTable from '../UserTable/UserTable';
import WrappedRegistrationForm from '../UserInput/UserInput';

const SubMenu = Menu.SubMenu;

class AsideCollapse extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      collapse: false,
    };
    // this.onSubmitForm = this.onSubmitForm.bind(this);
  }

    onCollapseChange = () => {
      this.setState({
        collapse: !this.state.collapse,
      });
    };

    onSubmitForm = () => {
      this.setState({
        reload: true,
      });
    }

    render() {
      return (
        <div className={this.state.collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo" />
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['user']}>
              <Menu.Item key="user">
                <Icon type="user" /><span className="nav-text">导航一</span>
              </Menu.Item>
              <Menu.Item key="setting">
                <Icon type="setting" /><span className="nav-text">导航二</span>
              </Menu.Item>
              <Menu.Item key="laptop">
                <Icon type="laptop" /><span className="nav-text">导航三</span>
              </Menu.Item>
              <Menu.Item key="notification">
                <Icon type="notification" /><span className="nav-text">导航四</span>
              </Menu.Item>
              <Menu.Item key="folder">
                <Icon type="folder" /><span className="nav-text">导航五</span>
              </Menu.Item>
              <SubMenu key="sub1" title={<span><Icon type="user" />导航六</span>}>
                <Menu.Item key="1">选项1</Menu.Item>
                <Menu.Item key="2">选项2</Menu.Item>
                <Menu.Item key="3">选项3</Menu.Item>
                <Menu.Item key="4">选项4</Menu.Item>
              </SubMenu>
            </Menu>
            <div className="ant-aside-action" onClick={this.onCollapseChange}>
              {this.state.collapse ? <Icon type="right" /> : <Icon type="left" />}
            </div>
          </aside>
          <div className="ant-layout-main">
            <div className="ant-layout-header" />
            <div className="ant-layout-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                <Breadcrumb.Item>某应用</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                {/* <div style={{ height: 220 }}> */}
                {/* 内容区域 */}
                {/* </div> */}
                <WrappedRegistrationForm onSubmitForm={this.onSubmitForm.bind(this)} />
                <UserTable />
              </div>
            </div>
            <div className="ant-layout-footer">
                  Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
            </div>
          </div>
        </div>
      );
    }
}

export default AsideCollapse;
