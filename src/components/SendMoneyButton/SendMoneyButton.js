import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spin, Form } from 'antd';
import * as actions from '../../store/actions/actions';
import SendmoneyForm from '../SendMoneyForm/SendMoneyForm';
import classes from './SendMoneyButton.module.scss';

function SendMoneyButton({ profile }) {
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();


  const sendMoneyHandle = () => {
    dispatch(actions.openModalAC(profile.id));
  };

  const editPersonalData = ({ newFirstName, newLastName }) => {
    dispatch(actions.updateProfileDataAC(newFirstName, newLastName, profileId));
  };

  const closeModalHandle = () => {
    dispatch(actions.closeModalAC());
  };

  return (
    <>
      <Button
        type="primary"
        size="middle"
        disabled={profile.isLoading}
        onClick={sendMoneyHandle}
        className={classes.button}
      >
        Send money
      </Button>
      <Modal
        visible={modal.isModalVisible && modal.modalType === profile.id}
        title="Send money to"
        centered
        cancelText="Cancel"
        onCancel={closeModalHandle}
        style={{ maxWidth: "300px" }}
        okButtonProps={{ disabled: modal.isModalLoading, style: { width: "70px" } }}
        okText={modal.isModalLoading ? <Spin /> : "Send"}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              editPersonalData(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <div className={classes.title}><span>{profile.firstName + " " + profile.lastName}</span></div>
        <div className={classes.info}>Email: <span>{profile.email}</span></div>
        <div className={classes.balance}>Your balance: <span>1000 $</span></div>
        <SendmoneyForm form={form} />
      </Modal >
    </>
  )
}

SendMoneyButton.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    email: PropTypes.string,
    created_at: PropTypes.string,
    isLoading: PropTypes.bool
  })
};

export default SendMoneyButton;