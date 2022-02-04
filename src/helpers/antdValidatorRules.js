import isStrongPassword from 'validator/es/lib/isStrongPassword';

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