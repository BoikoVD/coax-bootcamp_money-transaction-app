import * as types from '../types/types';

const defaultState = {
  userData: {
    id: null,
    email: null
  },
  isAuth: null,
  isLoading: false,
  isModalVisible: false,
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
    case types.SET_IS_LOADING_USER:
      return {
        ...state, isLoading: action.payload
      }
    case types.SET_ERROR_USER:
      return {
        ...state, error: action.payload
      }
    case types.SET_IS_MODAL_VISIBLE_USER:
      return {
        ...state, isModalVisible: action.payload
      }
    default:
      return state;
  }
}