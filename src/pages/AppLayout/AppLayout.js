import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { setIsAuthAC, setUserDataAC, setUserProfileDataAC } from '../../store/actions/actions';
import classes from './AppLayout.module.scss';
import LogoImg from '../../assets/img/Citizens_Financial_Group_logo.svg'

const { Header, Sider, Content } = Layout;

function AppLayout() {
  const [headerTitle, setHeaderTitle] = React.useState("Dashboard");
  const dispatch = useDispatch();

  const logoutHandle = async () => {
    try {
      Cookies.remove('accessToken');
      dispatch(setUserDataAC({
        id: null,
        email: null
      }));
      dispatch(setIsAuthAC(false));
    } catch (e) {
      console.log('LOGOUT ERROR: ', e);
    }
  }

  const onMenuSelect = (data) => {
    setHeaderTitle(data.item.props['data-title']);
  }

  return (
    <div className={classes.wrapper}>
      <Layout>
        <Sider
          className={classes.sider}
          breakpoint="md"
          collapsedWidth="0"
          theme="light"
          zeroWidthTriggerStyle={{ top: "11px" }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className={classes.logo} >
            <img src={LogoImg} alt='LOGO' />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ borderRight: "none" }}
            onSelect={onMenuSelect}
          >
            <Menu.Item key="1" icon={<UserOutlined />} data-title={"Dashboard"} >
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} data-title={"Contacts"}>
              <Link to="/contacts">Contacts</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />} data-title={"Transactions"}>
              <Link to="/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />} data-title={"Profile"}>
              <Link to="/profile">My profile</Link>
            </Menu.Item>
          </Menu>
          <div className={classes.vv}></div>
          <div className={classes.logoutBtn}>
            <div className={classes.logoutBtnWrapper}>
              <Button ghost type="primary" onClick={logoutHandle}>Logout</Button>
            </div>
          </div>
        </Sider>
        <Layout className={classes.contentLayout}>
          <Header className={classes.header}>{headerTitle}</Header>
          <Content className={classes.content}>
            <div className={classes.contentWrapper}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppLayout;