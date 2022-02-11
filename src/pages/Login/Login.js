import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions/actions';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Login.module.scss';

function Login() {
  const userData = useSelector(store => store.userReducer);
  const dispatch = useDispatch();

  const loginHandle = ({ email, password, remember }) => {
    dispatch(actions.loginAC(email, password, remember));
  };

  React.useEffect(() => {
    if (userData.error) {
      message.error(
        `${userData.error.response.data.error_description}`,
        5
      );
      dispatch(actions.setErrorUserAC(null));
    }
  }, [userData.error]);

  return (
    <div className={classes.wrapper}>
      <Form
        name="loginForm"
        size="large"
        initialValues={{ remember: true }}
        onFinish={loginHandle}
        className={classes.loginForm}
      >
        <Form.Item name="email" rules={validationRules.emailRules}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={validationRules.loginPasswordRules}>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={userData.isLoading}
            block
          >
            {userData.isLoading ? <Spin /> : "Log in"}
          </Button>
          Or <Link to="/registration" className={classes.link}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;