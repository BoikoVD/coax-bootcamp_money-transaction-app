import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { getProfileRequest, getUserRequest, getOwnContactsRequest } from './services/apiService';
import * as actions from './store/actions/actions';
import AppRouter from './router/AppRouter';
import './assets/styles/App.less';
import { contactsParser } from './helpers/helpers';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const isAuth = useSelector(state => state.userReducer.isAuth);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    if (Cookies.get('accessToken')) {
      try {
        const user = await getUserRequest();
        const userId = user.data.id;
        const userEmail = user.data.email;
        const profileData = await getProfileRequest(userId, "user");
        const contacts = await getOwnContactsRequest(userId);
        dispatch(actions.setUserDataAC({ id: userId, email: userEmail }));
        dispatch(actions.setProfileDataAC(profileData.data[0], true));
        dispatch(actions.setContactsAC(contactsParser(contacts.data)));
        dispatch(actions.setIsAuthAC(true));
      } catch (e) {
        console.log("CHECK AUTH ERROR: ", e);
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {
        isLoading
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
          <AppRouter isAuth={isAuth} />
      }
    </>
  )
}

export default App;
