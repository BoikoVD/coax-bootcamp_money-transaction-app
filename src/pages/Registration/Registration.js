import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, Modal, message } from 'antd';
import * as actions from '../../store/actions/actions';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Registration.module.scss';

function Registration() {
  const userData = useSelector(store => store.userReducer);
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandle = ({ email, firstName, lastName, password }) => {
    dispatch(actions.registrationAC(email, firstName, lastName, password));
  };

  const goToLoginHandle = () => {
    dispatch(actions.closeModalAC());
    navigate("/login");
  }
  const closeModalHandle = () => {
    dispatch(actions.closeModalAC());
  };

  React.useEffect(() => {
    if (modal.modalMessage) {
      if (modal.modalMessageType === "error") {
        message.error(modal.modalMessage, 5);
        dispatch(actions.removeModalMessageAC());
      }
      if (modal.modalMessageType === "success") {
        message.success(modal.modalMessage, 5);
        dispatch(actions.removeModalMessageAC());
      }
    }
  }, [modal.modalMessage]);

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
            <Button type="primary" htmlType="submit" block disabled={userData.isLoading}>
              {userData.isLoading ? <Spin /> : "Register"}
            </Button>
            <div className={classes.linkWrapper}>
              <Link to="/login" className={classes.link}>Back</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Registration complete"
        visible={modal.isModalVisible && modal.modalType === "registration"}
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