import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Logo from '../Logo/Logo';
import LogoutButton from '../LogoutButton/LogoutButton';
import classes from './Sidebar.module.scss';

const { Sider } = Layout;

function Sidebar({ pathname }) {

  return (
    <Sider
      theme="light"
      breakpoint="md"
      collapsedWidth="0"
      zeroWidthTriggerStyle={{ top: "11px" }}
      className={classes.sider}
      onBreakpoint={(broken) => { console.log(broken) }}
    >
      <Logo />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        style={{ borderRight: "none" }}
      >
        <Menu.Item key="/" icon={<UserOutlined />} >
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/contacts" icon={<VideoCameraOutlined />}>
          <Link to="/contacts">Contacts</Link>
        </Menu.Item>
        <Menu.Item key="/transactions" icon={<UploadOutlined />}>
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />}>
          <Link to="/profile">My profile</Link>
        </Menu.Item>
      </Menu>
      <div className={classes.logoutBtnWrapper}>
        <LogoutButton />
      </div>
    </Sider>
  )
}

Sidebar.propTypes = {
  pathname: PropTypes.string.isRequired
}

export default Sidebar;