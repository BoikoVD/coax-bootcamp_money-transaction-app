import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import * as actions from './store/actions/actions';
import AppRouter from './router/AppRouter';
import './assets/styles/App.less';

function App() {
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.checkAuthAC());
  }, []);

  return (
    <>
      {
        userData.isAuth === null
          ?
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh"
          }}>
            <Spin size="large" />
          </div>
          :
          <AppRouter isAuth={userData.isAuth} />
      }
    </>
  )
}

export default App;
