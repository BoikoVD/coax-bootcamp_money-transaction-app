import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';

function RegistrationModal({ isModalVisible, setIsModalVisible, error }) {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <Modal
      title={error ? "Something is wrong" : "Registration complete"}
      visible={isModalVisible}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      footer={null}
      bodyStyle={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      centered
    >
      {error ? (
        <>
          <p>{error}</p>
          <p>Please try again later</p>
          <Button type="primary" onClick={handleCloseModal}>OK</Button>
        </>
      ) : (
        <>
          <p>Registration complete, you can login now </p>
          <Button type="primary" onClick={handleGoToLogin}>Go to Login</Button>
        </>
      )}
    </Modal>
  );
}

RegistrationModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  error: PropTypes.string,
  setIsModalVisible: PropTypes.func.isRequired
}

export default RegistrationModal;