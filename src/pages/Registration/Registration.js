import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, Modal, message } from 'antd';
import { createProfileRequest, signUpRequest } from '../../services/apiService';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Registration.module.scss';

function Registration() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const navigate = useNavigate();

  const registerHandle = async ({ email, firstName, lastName, password }) => {
    setIsLoading(true);
    try {
      const createdUser = await signUpRequest(email, password);
      const userId = createdUser.data.user.id;
      await createProfileRequest(userId, email, firstName, lastName);
      setIsModalVisible(true);
    } catch (e) {
      console.log('REGISTRATION ERROR: ', e);
      message.error(`${e.message}. Please try again later`, 10);
    }
    setIsLoading(false);
  };

  const goToLoginHandle = () => {
    navigate("/login");
  }
  const closeModalHandle = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Form
          size="large"
          name="registrationForm"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={registerHandle}
          autoComplete="off"
          className={classes.form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={validationRules.emailRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First name"
            name="firstName"
            rules={validationRules.firstNameRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={validationRules.lastNameRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={validationRules.regPasswordRules}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={validationRules.regConfiirmPasswordRules}
            dependencies={["password"]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ sm: { span: 14, offset: 10 }, xs: { offset: 0 } }}
          >
            <Button type="primary" htmlType="submit" block disabled={isLoading}>
              {isLoading ? <Spin /> : "Register"}
            </Button>
            <div className={classes.linkWrapper}>
              <Link to="/login" className={classes.link}>Back</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Registration complete"
        visible={isModalVisible}
        centered
        style={{ maxWidth: "300px" }}
        bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        cancelText="Cancel"
        onCancel={closeModalHandle}
        okButtonProps={{ style: { width: "100px" } }}
        okText="Go to Login"
        onOk={goToLoginHandle}
      >
        <p>Registration complete, you can login now </p>
      </Modal>
    </div>
  )
}

export default Registration;