import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Form } from 'antd';
import * as validationRules from '../../helpers/antdValidatorRules.js';
import classes from './SendMoneyForm.module.scss';

function SendMoneyForm({ form }) {

  return (
    <Form
      form={form}
      name="transactionForm"
      layout="horizontal"
    >
      <Form.Item
        name="amount"
        label="Amount"
        required={false}
        rules={validationRules.amountRules}
      >
        <NumberFormat
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          placeholder="0.00"
          className={classes.input}
        />
      </Form.Item>
    </Form>
  )
}

SendMoneyForm.propTypes = {
  form: PropTypes.object.isRequired
}

export default SendMoneyForm;