import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import classes from './Login.module.scss';


function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={classes.wrapper}>
      <Form
        size="large"
        name="login"
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 8 }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 10,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}

        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Col span={8} offset={8}>
          <Link to="/registration" className={classes.link}>Registration</Link>
        </Col>
      </Form>
    </div>
  )
}

export default Login;