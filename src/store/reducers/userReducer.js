import * as types from '../types/types';

const defaultState = {
  userData: {
    id: null,
    email: null
  },
  isAuth: null,
  isLoading: false,
  error: null
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state, isLoading: true
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state, isAuth: true, userData: action.payload.userData, isLoading: false
      }
    case types.LOGIN_ERROR:
      return {
        ...state, error: action.payload.error, isLoading: false
      }
    case types.LOGOUT:
      return {
        ...state, userData: { id: null, email: null }, isAuth: false
      }
    case types.CHECK_AUTH:
      return {
        ...state, isLoading: true
      }
    case types.CHECK_AUTH_SUCCESS:
      return {
        ...state, isAuth: action.payload.isAuth, userData: action.payload.userData, isLoading: false
      }
    case types.CHECK_AUTH_ERROR:
      return {
        ...state, error: action.payload.error, isLoading: false
      }
    case types.REGISTRATION:
      return {
        ...state, isLoading: true
      }
    case types.REGISTRATION_SUCCESS:
      return {
        ...state, isLoading: false
      }
    case types.REGISTRATION_ERROR:
      return {
        ...state, error: action.payload.error, isLoading: false
      }
    default:
      return state;
  }
}