import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { setIsAuthAC, setUserDataAC } from '../../store/actions/actions';

function LogoutButton() {
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

  return (
    <Button type="primary" ghost onClick={logoutHandle}>
      Logout
    </Button>
  )
}

export default LogoutButton;