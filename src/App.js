import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Spin } from 'antd';
import { getUserRequest, getAllProfilesRequest } from './http/api';
import * as actions from './store/actions/actions';
import AppRouter from './router/AppRouter';
import './assets/styles/App.less';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const isAuth = useSelector(state => state.userReducer.isAuth);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    setIsLoading(true);
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      try {
        const user = await getUserRequest(accessToken);
        const userId = user.data.id;

        const usersData = await getAllProfilesRequest();
        let userData;
        for (let i of usersData.data) {
          if (i.user === userId) {
            userData = i;
          }
        }
        dispatch(actions.setUserProfileDataAC(userData));
        dispatch(actions.setIsAuthAC(true));
      } catch (e) {
        console.log("CHECK ERROR: ", e);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading
          ?
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
            <Spin size="large" />
          </div>
          :
          <AppRouter isAuth={isAuth} />
      }
    </>
  )
}

export default App;
