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
  isCurrent: true
};

export default function profilePageReducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_CURRENT_PROFILE_DATA:
      return {
        ...state, profileData: action.payload.profileData, isCurrent: action.payload.isCurrent
      }
    default:
      return state;
  }
}