import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import * as actions from '../../store/actions/actions';

function LogoutButton() {
  const isLoading = useSelector(state => state.userReducer.isLoading);
  const dispatch = useDispatch();

  const logoutHandle = () => {
    dispatch(actions.logoutAC());
  }

  return (
    <Button
      type="primary"
      ghost
      disabled={isLoading}
      onClick={logoutHandle}
      style={{ width: "76px" }}
    >
      {isLoading ? <Spin /> : "Logout"}
    </Button>
  )
}

export default LogoutButton;