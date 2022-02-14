import * as types from '../types/types';

const defaultState = {
  profileData: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    user: null,
    created_at: new Date(),
    isLogin: false
  },
  isCurrent: true,
  isLoading: false,
  error: null
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_IS_LOADING_PROFILE:
      return {
        ...state, isLoading: action.payload
      }
    case types.SET_PROFILE_DATA:
      return {
        ...state, profileData: action.payload.profileData, isCurrent: action.payload.isCurrent
      }
    case types.SET_UPDATED_PROFILE_DATA:
      return {
        ...state, profileData: {
          ...state.profileData,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        }
      }
    case types.SET_ERROR_PROFILE:
      return {
        ...state, error: action.payload
      }
    case types.IS_LOADING_THIS_PROFILE:
      return {
        ...state, profileData: { ...state.profileData, isLoading: !state.profileData.isLoading }
      }
    default:
      return state;
  }
}