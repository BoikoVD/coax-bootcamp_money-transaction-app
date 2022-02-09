import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { pageHeaderConstructor } from '../../helpers/helpers';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './AppLayout.module.scss';

const { Header, Content } = Layout;

function AppLayout() {
  const [title, setTitle] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    setTitle(pageHeaderConstructor(location.pathname));
  }, [location.pathname]);

  return (
    <div className={classes.wrapper}>
      <Layout>
        <Sidebar pathname={location.pathname} />
        <Layout className={classes.contentLayout}>
          <Header className={classes.header}>
            {title}
          </Header>
          <Content className={classes.content}>
            <div className={classes.contentBody}>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default AppLayout;