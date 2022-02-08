import React from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Form, Input, Button, Checkbox, Spin, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getProfileRequest, loginApiRequest } from '../../http/api';
import * as actions from '../../store/actions/actions';
import * as validationRules from '../../helpers/antdValidatorRules';
import classes from './Login.module.scss';


function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();

  const onFinish = async ({ email, password, remember }) => {
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
      setIsModalVisible(true);
      console.log('LOGIN ERROR: ', e);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
          <Button type="primary" htmlType="submit" className={classes.loginFormButton} disabled={isLoading}>
            {isLoading ? <Spin /> : "Log in"}
          </Button>
          Or <Link to="/registration" className={classes.link}>register now!</Link>
        </Form.Item>
      </Form>
      <Modal
        title="Something is wrong"
        visible={isModalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
        bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        centered
      >
        <p>An error has occurred</p>
        <p>Please check that you have entered the data correctly and try again</p>
        <Button type="primary" onClick={handleCloseModal}>OK</Button>
      </Modal>
    </div>
  )
}

export default Login;