import * as types from '../types/types';

const defaultState = {
  currentProfile: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    user: null,
    created_at: null
  },
  isAuth: false,
  userProfiles: [],
  isLoading: false,
  error: ''
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_IS_AUTH:
      return {
        ...state, isAuth: action.payload
      }
    case types.SET_USER_PROFILE_DATA:
      return {
        ...state, currentProfile: action.payload
      }
    case types.SET_UPDATED_PROFILE_DATA:
      return {
        ...state, currentProfile: {
          ...state.currentProfile,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    default:
      return state;
  }
}