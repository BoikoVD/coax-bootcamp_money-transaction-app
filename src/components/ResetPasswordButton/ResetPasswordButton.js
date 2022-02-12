import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Spin } from 'antd';
import { RESET_PASSWORD } from '../../store/types/modalTypes';
import * as actions from '../../store/actions/actions';
import ResetPasswordForm from '../ResetPasswordForm/ResetPasswordForm';
import classes from './ResetPasswordButton.module.scss';

function ResetPasswordButton() {
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const resetPassword = ({ newPassword }) => {
    dispatch(actions.resetPasswordAC(newPassword));
  };

  const resetPasswordHandle = () => {
    dispatch(actions.openModalAC(RESET_PASSWORD));
  };
  const closeModalHandle = () => {
    dispatch(actions.closeModalAC());
  };

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
        visible={modal.isModalVisible && modal.modalType === RESET_PASSWORD}
        title="Reset password"
        centered
        style={{ maxWidth: "300px" }}
        cancelText="Cancel"
        onCancel={closeModalHandle}
        okButtonProps={{ disabled: modal.isModalLoading, style: { width: "70px" } }}
        okText={modal.isModalLoading ? <Spin /> : "Reset"}
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
}



export default ResetPasswordButton;