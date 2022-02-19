import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Logo from '../Logo/Logo';
import LogoutButton from '../LogoutButton/LogoutButton';
import classes from './Sidebar.module.scss';

const { Sider } = Layout;

function Sidebar({ pathname }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { width } = useWindowDimensions();

  return (
    <Sider
      theme="light"
      breakpoint="md"
      collapsedWidth="0"
      zeroWidthTriggerStyle={{ top: "11px" }}
      className={classes.sider}
      collapsed={width < 768 ? isCollapsed : false}
      onCollapse={() => setIsCollapsed(!isCollapsed)}
    >
      <Logo />
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[pathname]}
        style={{ borderRight: "none" }}
        onSelect={() => setIsCollapsed(true)}
      >
        <Menu.Item key="/" icon={<UserOutlined />} title="">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/contacts" icon={<VideoCameraOutlined />} title="">
          <Link to="/contacts">Contacts</Link>
        </Menu.Item>
        <Menu.Item key="/transactions" icon={<UploadOutlined />} title="">
          <Link to="/transactions">Transactions</Link>
        </Menu.Item>
        <Menu.Item key="/profile" icon={<UserOutlined />} title="">
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