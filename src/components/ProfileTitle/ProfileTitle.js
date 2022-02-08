import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Modal, Spin, Form, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateProfileDataRequest } from '../../http/api';
import { setUpdatedProfileDataAC } from '../../store/actions/actions';
import EditPersonalDataForm from '../EditPersonalDataForm/EditPersonalDataForm';
import classes from './ProfileTitle.module.scss';

function ProfileTitle({ isCurrent, firstName, lastName, profileId }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const editPersonalData = async ({ newFirstName, newLastName }) => {
    setIsLoading(true);
    try {
      const accessToken = Cookies.get("accessToken");
      await updateProfileDataRequest(accessToken, newFirstName, newLastName, profileId);
      dispatch(setUpdatedProfileDataAC(newFirstName, newLastName));
      setIsModalVisible(false);
      message.success("Data saved successfully", 10);
      setIsLoading(false);
    } catch (e) {
      message.error("Something is wrong. Please try again later!", 10)
      console.log("EDIT PERSONAL DATA ERROR: ", e);
      setIsLoading(false);
    }
  };

  const editPersonalDataHandle = () => {
    setIsModalVisible(true)
  };

  const closeModalHandle = () => {
    setIsModalVisible(false);
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
          <Button
            type="primary"
            className={classes.editBtn}
            onClick={() => { navigate('/profile/8aae2c22-06fa-46fa-86c6-aa9ab26c997f') }}
          >Next</Button>
          <Modal
            visible={isModalVisible}
            title="Edit personal data"
            centered
            style={{ maxWidth: "300px" }}
            cancelText="Cancel"
            onCancel={closeModalHandle}
            okButtonProps={{ disabled: isLoading, style: { width: "70px" } }}
            okText={isLoading ? <Spin /> : "Edit"}
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
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  profileId: PropTypes.string,
}

export default ProfileTitle;