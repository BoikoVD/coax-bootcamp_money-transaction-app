import isStrongPassword from 'validator/es/lib/isStrongPassword';
import isCurrency from 'validator/es/lib/isCurrency';

export const emailRules = [
  { required: true, message: 'Please input your email!' },
  { whitespace: true, message: 'Please input your email!' },
  { type: 'email', message: 'Please enter a valid email!' }
];
export const firstNameRules = [
  { required: true, message: 'Please input your first name!' },
  { whitespace: true, message: 'Please input your first name!' },
];
export const lastNameRules = [
  { required: true, message: 'Please input your last name!' },
  { whitespace: true, message: 'Please input your last name!' },
];
export const loginPasswordRules = [
  { required: true, message: 'Please input your password!' },
  { min: 8, message: 'Minimum number of characters 8' },
];
export const regPasswordRules = [
  { required: true, message: 'Please input your password!' },
  { min: 8, message: 'Minimum number of characters 8' },
  {
    validator: (_, value) => (
      value && isStrongPassword(value)
        ?
        Promise.resolve()
        :
        Promise.reject('Password must contain (0-9), (A-z), (@#$%^&*)'))
  }
];
export const regConfiirmPasswordRules = [
  { required: true, message: 'Please input the same passwords!' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve()
      }
      return Promise.reject("Passwords are not the same!")
    }
  })
];
export const resetConfiirmPasswordRules = [
  { required: true, message: 'Please input the same passwords!' },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("newPassword") === value) {
        return Promise.resolve()
      }
      return Promise.reject("Passwords are not the same!")
    }
  })
];

export const amountRules = [
  { required: true, message: 'Please input the amount!' },
  {
    validator: (_, value) => (
      value && isCurrency(value, {
        symbol: '$',
        require_symbol: false,
        allow_space_after_symbol: false,
        symbol_after_digits: false,
        allow_negatives: false,
        parens_for_negatives: false,
        negative_sign_before_digits: false,
        negative_sign_after_digits: false,
        allow_negative_sign_placeholder: false,
        thousands_separator: ',',
        decimal_separator: '.',
        allow_decimal: true,
        require_decimal: false,
        digits_after_decimal: [2],
        allow_space_after_digits: false
      })
        ?
        Promise.resolve()
        :
        Promise.reject(`Correct format is "0.00"`))
  }
];