import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spin, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EDIT_PROFILE_DATA } from '../../store/types/modalTypes';
import * as actions from '../../store/actions/actions';
import EditPersonalDataForm from '../EditPersonalDataForm/EditPersonalDataForm';
import classes from './ProfileTitle.module.scss';

function ProfileTitle({ isCurrent, firstName, lastName, profileId }) {
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const editPersonalData = ({ newFirstName, newLastName }) => {
    dispatch(actions.updateProfileDataAC(newFirstName, newLastName, profileId));
  };

  const editPersonalDataHandle = () => {
    dispatch(actions.openModalAC(EDIT_PROFILE_DATA));
  };

  const closeModalHandle = () => {
    dispatch(actions.closeModalAC());
  };

  return (
    <div className={classes.title}>
      {firstName + " " + lastName}
      {isCurrent
        ?
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            className={classes.editBtn}
            onClick={editPersonalDataHandle}
          />
          <Modal
            visible={modal.isModalVisible && modal.modalType === EDIT_PROFILE_DATA}
            title="Edit personal data"
            centered
            style={{ maxWidth: "300px" }}
            cancelText="Cancel"
            onCancel={closeModalHandle}
            okButtonProps={{ disabled: modal.isModalLoading, style: { width: "70px" } }}
            okText={modal.isModalLoading ? <Spin /> : "Edit"}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  editPersonalData(values);
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <EditPersonalDataForm form={form} firstName={firstName} lastName={lastName} />
          </Modal >
        </>
        :
        <></>}
    </div>
  )
}

ProfileTitle.propTypes = {
  isCurrent: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
}

export default ProfileTitle;