import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Login.module.scss';


function Login() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={classes.wrapper}>
      <Form
        name="loginForm"
        size="large"
        className={classes.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item name="email" rules={validationRules.emailRules}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={validationRules.loginPasswordRules}>
          <Input
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
          <Button type="primary" htmlType="submit" className={classes.loginFormButton}>
            Log in
          </Button>
          Or <Link to="/registration" className={classes.link}>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;