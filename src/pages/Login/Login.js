import React from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getProfileRequest, loginApiRequest } from '../../http/api';
import * as actions from '../../store/actions/actions';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Login.module.scss';

function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const loginHandle = async ({ email, password, remember }) => {
    setIsLoading(true);
    try {
      const user = await loginApiRequest(email, password);

      const userId = user.data.user.id;
      const userEmail = user.data.user.email;
      const accessToken = user.data.access_token;
      const expiresIn = user.data.expires_in / 60 / 60 / 24;

      const profileData = await getProfileRequest(userId, accessToken, "user");

      if (remember) {
        Cookies.set('accessToken', `${accessToken}`, { expires: expiresIn });
      }
      dispatch(actions.setUserDataAC({ id: userId, email: userEmail }));
      dispatch(actions.setProfileDataAC(profileData.data[0], true));
      dispatch(actions.setIsAuthAC(true));
    } catch (e) {
      setIsLoading(false);
      console.log('LOGIN ERROR: ', e);
      message.error(
        "An error has occurred. Please check that you have entered the data correctly and try again",
        10
      );
    }
  };

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
            disabled={isLoading}
            block
          >
            {isLoading ? <Spin /> : "Log in"}
          </Button>
          Or <Link to="/registration" className={classes.link}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;