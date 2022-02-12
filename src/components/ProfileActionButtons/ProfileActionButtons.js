import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Button, Modal, Form, Spin, message } from 'antd';
import { resetPasswordRequest } from '../../services/apiService';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import classes from './ProfileActionButtons.module.scss';

function ProfileActionButtons({ isCurrent, id }) {
  const [isFriend, setIsFriend] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const userContacts = useSelector(state => state.contactsReducer.userContacts);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (userContacts.length > 0) {
      for (let i of userContacts) {
        if (i.id === id) {
          setIsFriend(true);
        }
      };
    };
  }, []);

  const resetPasswordHandle = () => {
    setIsModalVisible(true);
  };
  const closeModalHandle = () => {
    setIsModalVisible(false);
  };

  const resetPassword = async ({ newPassword }) => {
    setIsLoading(true);
    try {
      await resetPasswordRequest(newPassword);
      setIsModalVisible(false);
      message.success("Data saved successfully", 10);
    } catch (e) {
      message.error("Something is wrong. Please try again later!", 10)
      console.log("RESET PASSWORD ERROR: ", e);
    }
    setIsLoading(false);
  };

  if (isCurrent) {
    return (
      <>
        <Button
          type="primary"
          ghost
          size="small"
          className={classes.button}
          onClick={resetPasswordHandle}
        >
          Reset Password
        </Button>
        <Modal
          visible={isModalVisible}
          title="Reset password"
          centered
          style={{ maxWidth: "300px" }}
          cancelText="Cancel"
          onCancel={closeModalHandle}
          okButtonProps={{ disabled: isLoading, style: { width: "70px" } }}
          okText={isLoading ? <Spin /> : "Reset"}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                resetPassword(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <ResetPasswordForm form={form} />
        </Modal >
      </>
    )
  } else {
    return (
      <div className={classes.buttonsWrapper}>
        {isFriend
          ?
          <>
            <Button
              type="primary"
              size="middle"
              className={classes.button}
            >
              Send money
            </Button>
            <Button
              type="primary"
              ghost
              size="small"
              className={classes.button}
            >
              Delete from contacts
            </Button>
          </>
          :
          <Button
            type="primary"
            size="middle"
            className={classes.button}
          >
            Add to your contacts
          </Button>}
      </div>
    )
  }
}

ProfileActionButtons.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  id: PropTypes.string
}

export default ProfileActionButtons;