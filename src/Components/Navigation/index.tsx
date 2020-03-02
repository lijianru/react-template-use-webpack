import * as React from 'react'
import { Layout, Menu } from 'antd'
import { UserOutlined, UploadOutlined, LoginOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Sider } = Layout

export default class Navigation extends React.Component {
  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          // console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">
              <UserOutlined />
              <span className="nav-text">Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/character">
              <UploadOutlined />
              <span className="nav-text">Character</span>
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
    )
  }
}
