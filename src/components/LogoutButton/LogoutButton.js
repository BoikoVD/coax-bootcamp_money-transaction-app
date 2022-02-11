import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import * as actions from '../../store/actions/actions';

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(actions.logoutAC());
  }

  return (
    <Button type="primary" ghost onClick={logoutHandle}>
      Logout
    </Button>
  )
}

export default LogoutButton;