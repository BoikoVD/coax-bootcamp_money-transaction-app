import * as types from '../types/types';

const defaultState = {
  userData: {
    id: null,
    email: null
  },
  userContacts: [],
  isAuth: false,
  isLoading: false,
  error: null
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_IS_AUTH:
      return {
        ...state, isAuth: action.payload
      }
    case types.SET_USER_DATA:
      return {
        ...state, userData: action.payload
      }
    default:
      return state;
  }
}