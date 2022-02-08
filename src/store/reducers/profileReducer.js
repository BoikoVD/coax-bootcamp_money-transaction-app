import * as types from '../types/types';

const defaultState = {
  profileData: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    user: null,
    created_at: new Date()
  },
  isCurrent: true,
  isLoading: false,
  error: null
};

export default function profileReducer(state = defaultState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}