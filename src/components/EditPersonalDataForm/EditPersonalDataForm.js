import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import * as validationRules from '../../helpers/antdValidatorRules';

function EditPersonalDataForm({ form, firstName, lastName }) {

  return (
    <Form
      form={form}
      layout="vertical"
      name="form_in_modal"
    >
      <Form.Item
        name="newFirstName"
        label="First name"
        required={false}
        initialValue={firstName}
        rules={validationRules.firstNameRules}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="newLastName"
        label="Last name"
        required={false}
        initialValue={lastName}
        rules={validationRules.lastNameRules}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

EditPersonalDataForm.propTypes = {
  form: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export default EditPersonalDataForm;