import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spin, Form } from 'antd';
import * as actions from '../../store/actions/actions';
import SendmoneyForm from '../SendMoneyForm/SendMoneyForm';
import classes from './SendMoneyButton.module.scss';

function SendMoneyButton({ children, profile, className }) {
  const user = useSelector(state => state.userReducer.userData);
  const transactionsData = useSelector(state => state.transactionsReducer);
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const buttonStyles = className ? cn(classes.button, className) : classes.button;

  const createTransaction = ({ amount }) => {
    dispatch(actions.createTransactionAC(user.id, profile.user, amount));
  };

  const sendMoneyHandle = () => {
    dispatch(actions.openModalAC(profile.id));
  };

  const closeModalHandle = () => {
    dispatch(actions.closeModalAC());
  };

  return (
    <>
      <Button
        type={children ? "text" : "primary"}
        size="middle"
        disabled={profile.isLoading}
        onClick={sendMoneyHandle}
        className={buttonStyles}
      >
        {children ? children : "Send money"}
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
              createTransaction(values);
            })
        }}
      >
        <div className={classes.title}><span>{profile.firstName + " " + profile.lastName}</span></div>
        <div className={classes.info}>Email: <span>{profile.email}</span></div>
        <div className={classes.balance}>Your balance: <span>{transactionsData.balance} $</span></div>
        <SendmoneyForm form={form} />
      </Modal >
    </>
  )
}

SendMoneyButton.propTypes = {
  children: PropTypes.any,
  profile: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    user: PropTypes.string,
    email: PropTypes.string,
    created_at: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  className: PropTypes.string
};

export default SendMoneyButton;