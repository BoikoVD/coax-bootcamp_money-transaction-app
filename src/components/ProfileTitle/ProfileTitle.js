import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Spin, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as actions from '../../store/actions/actions';
import EditPersonalDataForm from '../EditPersonalDataForm/EditPersonalDataForm';
import classes from './ProfileTitle.module.scss';

function ProfileTitle({ isCurrent, firstName, lastName, profileId }) {
  const modal = useSelector(state => state.modalReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const editProfileData = ({ newFirstName, newLastName }) => {
    dispatch(actions.editProfileDataAC(newFirstName, newLastName, profileId));
  };

  const editProfileDataHandle = () => {
    dispatch(actions.openModalAC("EDIT_PROFILE_DATA"));
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
            onClick={editProfileDataHandle}
          />
          <Modal
            visible={modal.isModalVisible && modal.modalType === "EDIT_PROFILE_DATA"}
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
                  editProfileData(values);
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
  isCurrent: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileId: PropTypes.string,
}

export default ProfileTitle;