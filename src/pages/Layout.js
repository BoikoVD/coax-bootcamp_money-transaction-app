import React from 'react';
import Cookies from 'js-cookie';
import { Button } from 'antd';
import { setIsAuthAC, setUserProfileDataAC } from '../store/actions/actions';
import { useDispatch } from 'react-redux';

function Layout() {
  const dispatch = useDispatch();

  const logoutHandle = async () => {
    try {
      Cookies.remove('accessToken');
      dispatch(setUserProfileDataAC({
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        user: null,
        created_at: null
      }));
      dispatch(setIsAuthAC(false));
    } catch (e) {
      console.log('LOGOUT ERROR: ', e);
    }
  }

  return (
    <div>
      Layout Page
      <Button type="primary" onClick={logoutHandle}>Logout</Button>
    </div>
  )
}

export default Layout;