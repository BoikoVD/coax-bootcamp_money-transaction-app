import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import * as validationRules from '../../helpers/antdValidatorRules';

function ResetPasswordForm({ form }) {

  return (
    <Form
      form={form}
      layout="vertical"
      name="resetPasswordForm"
    >
      <Form.Item
        name="newPassword"
        label="New password"
        rules={validationRules.regPasswordRules}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmNewPassword"
        label="Confirm new password"
        dependencies={["newPassword"]}
        rules={validationRules.resetConfiirmPasswordRules}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  )
}

ResetPasswordForm.propTypes = {
  form: PropTypes.object.isRequired
}

export default ResetPasswordForm;