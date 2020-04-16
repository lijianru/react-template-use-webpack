import React, { ReactElement } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export default class Navigation extends React.Component {
  render(): ReactElement {
    return (
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">
              <UserOutlined />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link to="/login">
              <LoginOutlined />
              <span className="nav-text">Login</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
