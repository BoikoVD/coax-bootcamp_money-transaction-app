import React, { useState } from 'react';
import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { pageHeaderConstructor } from '../../helpers/helpers';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './AppLayout.module.scss';

const { Header, Content } = Layout;

function AppLayout() {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const bodyRef = React.useRef(null);
  const location = useLocation();

  const skipAction = (key) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      bodyRef.current.focus();
    };
    setIsSkipLinkDisplayed(false);
  };

  React.useEffect(() => {
    setTitle(pageHeaderConstructor(location.pathname));
  }, [location.pathname]);

  return (
    <Layout className={classes.wrapper}>
      <a
        tabIndex={1}
        onFocus={() => setIsSkipLinkDisplayed(true)}
        onKeyDown={skipAction}
        className={cn(classes.skipLink, { [classes.displayed]: isSkipLinkDisplayed })}
      >
        Go to content
      </a>
      <Sidebar pathname={location.pathname} />
      <Layout className={classes.contentLayout}>
        <Header className={classes.header}>
          {title}
        </Header>
        <Content className={classes.content}>
          <div className={classes.contentBody} ref={bodyRef} tabIndex={0}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout;