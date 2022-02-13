import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import * as validationRules from '../../helpers/antdValidatorRules';

function SendMoneyForm({ form }) {

  return (
    <Form
      form={form}
      name="transactionForm"
    >
      <Form.Item
        name="amount"
        label="Amount"
        required={false}
        rules={validationRules.amountRules}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

SendMoneyForm.propTypes = {
  form: PropTypes.object.isRequired
}

export default SendMoneyForm;