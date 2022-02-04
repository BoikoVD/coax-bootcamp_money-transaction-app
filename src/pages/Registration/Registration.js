import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd';
import * as validationRules from '../../helpers/antdValidatorRules';
import { authApi, profileApi } from '../../http/api';
import RegistrationModal from '../../components/RegistrationModal/RegistrationModal';
import classes from './Registration.module.scss';

function Registration() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const onFinish = async ({ email, firstName, lastName, password }) => {
    setIsLoading(true);
    try {
      const createdUser = await authApi.post('/signup', { email, password }).then((res) => {
        return res;
      });
      const userId = createdUser.data.user.id;
      await profileApi.post('/profile', { firstName, lastName, user: userId, email }).then((res) => {
        if (res.status === 201) {
          setErrorMessage(null);
          setIsModalVisible(true);
        } else {
          setErrorMessage('Something went wrong');
          setIsModalVisible(true);
        }
      });
    } catch (e) {
      console.log('REGISTRATION ERROR: ', e);
      setErrorMessage(e.message);
      setIsModalVisible(true);
    }
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Form
          size="large"
          name="registrationForm"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={classes.form}
        >
          <Form.Item label="Email" name="email" rules={validationRules.emailRules}>
            <Input />
          </Form.Item>
          <Form.Item label="First name" name="firstName" rules={validationRules.firstNameRules}>
            <Input />
          </Form.Item>
          <Form.Item label="Last name" name="lastName" rules={validationRules.lastNameRules} >
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validationRules.regPasswordRules} >
            <Input.Password />
          </Form.Item>
          <Form.Item label="Confirm password" name="confirmPassword" dependencies={["password"]} rules={validationRules.regConfiirmPasswordRules} >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ sm: { span: 14, offset: 10 }, xs: { offset: 0 } }}>
            <Button type="primary" htmlType="submit" block disabled={isLoading}>
              {isLoading ? <Spin /> : "Register"}
            </Button>
            <div className={classes.linkWrapper}>
              <Link to="/login" className={classes.link}>Back</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <RegistrationModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} error={errorMessage} />
    </div>
  )
}

export default Registration;